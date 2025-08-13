// FILE: src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, message, subject, reservationDate, partySize } = body

    // Validation
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Please fill in all required fields: First Name, Last Name, Email, and Message' 
        },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Please enter a valid email address' 
        },
        { status: 400 }
      )
    }

    const timestamp = new Date().toISOString()
    const submissionData = {
      name: `${firstName} ${lastName}`,
      email,
      phone: phone || 'Not provided',
      subject: subject || 'General Inquiry',
      message,
      reservationDate: reservationDate || null,
      partySize: partySize || null,
      timestamp,
      userAgent: request.headers.get('user-agent') || 'Unknown',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'
    }

    // 📝 Log to console (visible in Vercel logs)
    console.log('🍽️ NEW RESTAURANT CONTACT SUBMISSION:')
    console.log('====================================')
    console.log(`Name: ${submissionData.name}`)
    console.log(`Email: ${submissionData.email}`)
    console.log(`Phone: ${submissionData.phone}`)
    console.log(`Subject: ${submissionData.subject}`)
    console.log(`Message: ${submissionData.message}`)
    if (submissionData.reservationDate) {
      console.log(`Reservation Date: ${submissionData.reservationDate}`)
      console.log(`Party Size: ${submissionData.partySize}`)
    }
    console.log(`Time: ${submissionData.timestamp}`)
    console.log('====================================')

    // 📧 Send email notification
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        interface TransporterConfig {
          host?: string
          port?: number
          secure?: boolean
          service?: string
          auth: {
            user: string
            pass: string
          }
          tls?: {
            rejectUnauthorized?: boolean
            ciphers?: string
          }
          requireTLS?: boolean
        }

        let transporterConfig: TransporterConfig = {
          host: process.env.EMAIL_HOST,
          port: parseInt(process.env.EMAIL_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        }

        // Provider-specific configurations
        const host = process.env.EMAIL_HOST.toLowerCase()
        
        if (host.includes('gmail')) {
          transporterConfig = {
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            }
          }
        } else if (host.includes('outlook') || host.includes('hotmail')) {
          transporterConfig = {
            service: 'hotmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            }
          }
        }

        const transporter = nodemailer.createTransport(transporterConfig)
        await transporter.verify()

        const isReservation = submissionData.reservationDate && submissionData.partySize
        const emailSubject = isReservation 
          ? `🍽️ New Reservation Request - ${submissionData.subject}`
          : `📧 New Contact from Savoro Website - ${submissionData.subject}`

        const mailOptions = {
          from: `"Savoro Restaurant" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          replyTo: submissionData.email,
          subject: emailSubject,
          html: `
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #fef7ee, #f0fdfa); padding: 30px; border-radius: 15px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ea7c2a; font-size: 28px; margin: 0; font-family: 'Playfair Display', serif;">
                  🍽️ Savoro Restaurant
                </h1>
                <p style="color: #64748b; margin: 10px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
                  ${isReservation ? 'New Reservation Request' : 'New Customer Contact'}
                </p>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px;">
                <h2 style="color: #334155; margin-bottom: 20px; font-size: 20px;">Customer Details:</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 120px;">Name:</td>
                    <td style="padding: 8px 0; color: #1e293b;">${submissionData.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0;"><a href="mailto:${submissionData.email}" style="color: #ea7c2a; text-decoration: none;">${submissionData.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone:</td>
                    <td style="padding: 8px 0;"><a href="tel:${submissionData.phone}" style="color: #ea7c2a; text-decoration: none;">${submissionData.phone}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject:</td>
                    <td style="padding: 8px 0; color: #1e293b;">${submissionData.subject}</td>
                  </tr>
                  ${isReservation ? `
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Date:</td>
                    <td style="padding: 8px 0; color: #ea7c2a; font-weight: 600;">${submissionData.reservationDate ? new Date(submissionData.reservationDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : ''}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Party Size:</td>
                    <td style="padding: 8px 0; color: #ea7c2a; font-weight: 600;">${submissionData.partySize} ${submissionData.partySize === '1' ? 'person' : 'people'}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Received:</td>
                    <td style="padding: 8px 0; color: #1e293b;">${new Date(timestamp).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</td>
                  </tr>
                </table>
              </div>

              <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px;">
                <h3 style="color: #334155; margin-bottom: 15px; font-size: 18px;">
                  ${isReservation ? 'Reservation Details:' : 'Message:'}
                </h3>
                <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #ea7c2a;">
                  <p style="line-height: 1.6; color: #475569; margin: 0; white-space: pre-wrap;">${submissionData.message}</p>
                </div>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${submissionData.email}" 
                   style="background: #ea7c2a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: 600; margin-right: 10px;">
                  Reply to Customer
                </a>
                ${isReservation ? `
                <a href="tel:${submissionData.phone}" 
                   style="background: #14b8a6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: 600;">
                  Call for Reservation
                </a>
                ` : ''}
              </div>

              ${isReservation ? `
              <div style="background: #dcfdf7; border: 1px solid #14b8a6; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
                <h4 style="color: #0f766e; margin: 0 0 10px 0; font-size: 16px;">⏰ Action Required</h4>
                <p style="color: #134e4a; margin: 0; font-size: 14px;">
                  <strong>Reservation request requires confirmation within 24 hours.</strong><br>
                  Please contact the customer to confirm availability and finalize details.
                </p>
              </div>
              ` : ''}

              <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; border-left: 4px solid #64748b; margin-top: 20px;">
                <h4 style="color: #334155; margin: 0 0 10px 0; font-size: 14px;">Technical Information:</h4>
                <p style="color: #64748b; font-size: 12px; margin: 0; line-height: 1.4;">
                  <strong>IP Address:</strong> ${submissionData.ip}<br>
                  <strong>User Agent:</strong> ${submissionData.userAgent.substring(0, 100)}${submissionData.userAgent.length > 100 ? '...' : ''}<br>
                  <strong>Submission ID:</strong> SAVORO_${Date.now()}
                </p>
              </div>

              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="color: #64748b; font-size: 12px; margin: 0;">
                  This email was sent from your Savoro Restaurant website contact form.<br>
                  <strong style="color: #ea7c2a;">Response Goal:</strong> ${isReservation ? 'Within 2 hours' : 'Within 24 hours'}
                </p>
              </div>
            </div>
          `,
        }

        await transporter.sendMail(mailOptions)
        console.log('✅ Email notification sent successfully')
        
      } catch (emailError: unknown) {
        const error = emailError as Error
        console.error('❌ Email sending failed:', {
          error: error.message,
          name: error.name,
          host: process.env.EMAIL_HOST,
          user: process.env.EMAIL_USER?.substring(0, 5) + '***'
        })
      }
    } else {
      console.log('⚠️ Email credentials not configured')
    }

    const responseMessage = submissionData.reservationDate
      ? 'Thank you for your reservation request! We will contact you within 2 hours to confirm availability and finalize your booking.'
      : 'Thank you for your message! We will get back to you within 24 hours.'

    return NextResponse.json(
      { 
        success: true,
        message: responseMessage,
        timestamp,
        submissionId: `SAVORO_${Date.now()}`,
        isReservation: !!submissionData.reservationDate
      },
      { status: 200 }
    )

  } catch (error: unknown) {
    const err = error as Error
    console.error('❌ Contact form error:', {
      message: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString()
    })
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to send message. Please call us directly at +1 (555) 123-4567 or try again later.',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}