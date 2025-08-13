# Savoro Restaurant - Modern Restaurant Website Template

A stunning, feature-rich restaurant website built with Next.js 14, featuring advanced animations, real-time analytics, and seamless contact functionality.

## 🚀 Features

### ✨ **Advanced Animations & Interactions**
- **Parallax Scrolling**: Smooth depth-based scrolling effects
- **Circular Image Carousel**: Unique portal-style image display with auto-rotation
- **Progress Bars**: Scroll-triggered progress indicators and counting animations
- **Framer Motion**: Sophisticated page transitions and micro-interactions
- **Floating Elements**: Dynamic background animations and particles

### 📊 **Real-Time Analytics Dashboard**
- **Google Analytics 4 Integration**: Live visitor tracking and metrics
- **Amazon QuickSight-Inspired Design**: Professional charts and visualizations
- **Dynamic Statistics**: Real-time visitor counts, page views, and traffic sources
- **Device Analytics**: Mobile, desktop, and tablet usage breakdown
- **Interactive Charts**: Line charts, pie charts, and progress circles using Recharts

### 📧 **Smart Contact System**
- **Dual-Purpose Forms**: Contact inquiries and reservation requests
- **Email Notifications**: Automatic email alerts to restaurant owner
- **Form Validation**: Client and server-side validation
- **Anti-Bot Protection**: Human verification systems
- **Reservation Management**: Date/time selection with party size tracking

### 🎨 **Modern Design System**
- **Color Schemes**: Warm restaurant palette (oranges, creams, earth tones)
- **Typography**: Playfair Display headings, Inter body text, Dancing Script accents
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Glass Morphism**: Modern frosted glass effects
- **Dark/Light Themes**: Automatic theme adaptation

### 🔧 **Technical Excellence**
- **Next.js 14**: Latest App Router, Server Components, and TypeScript
- **Performance Optimized**: Image optimization, lazy loading, and caching
- **SEO Friendly**: Meta tags, structured data, and social media integration
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Analytics account (optional)
- Email service (Gmail, Outlook, etc.)

### 1. **Install Dependencies**
```bash
# Clone and install
npm install

# Create environment file
cp .env.example .env.local
```

### 2. **Configure Environment Variables**

Edit `.env.local` with your settings:

```env
# Google Analytics (required for tracking)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Admin Dashboard Analytics (optional)
GA4_PROPERTY_ID=123456789
GA_SERVICE_ACCOUNT_KEY_BASE64=your_base64_key

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=restaurant-owner@example.com

# Admin Dashboard Password
NEXT_PUBLIC_ADMIN_PASSWORD=savoro2025
```

### 3. **Setup Google Analytics** (Optional but Recommended)

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Tracking ID (G-XXXXXXXXXX)
3. For admin dashboard, create a service account:
   - Go to Google Cloud Console
   - Create service account with Analytics Viewer permissions
   - Download JSON key and base64 encode it:
   ```bash
   base64 -i service-account-key.json
   ```

### 4. **Setup Email Service**

#### For Gmail:
1. Enable 2-Factor Authentication
2. Generate App Password: Google Account → Security → App Passwords
3. Use app password (not your regular password)

#### For Other Providers:
- **Outlook/Hotmail**: Use regular credentials
- **Custom SMTP**: Update host and port accordingly

### 5. **Run Development Server**
```bash
npm run dev
# Open http://localhost:3000
```

### 6. **Build for Production**
```bash
npm run build
npm start
```

## 🚀 Deployment Options

### **Vercel (Recommended)**
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### **Netlify**
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`
4. Add environment variables

### **Traditional Hosting**
1. Run `npm run build`
2. Upload `.next` folder and dependencies
3. Configure Node.js server

## 📁 Project Structure

```
savoro-restaurant/
├── src/
│   ├── app/                 # Next.js 14 App Router
│   │   ├── admin/          # Analytics dashboard
│   │   ├── contact/        # Contact page
│   │   ├── api/            # API routes
│   │   │   ├── analytics/  # Analytics endpoint
│   │   │   └── contact/    # Contact form handler
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # Reusable components
│   │   ├── CircularCarousel.tsx
│   │   ├── ParallaxSection.tsx
│   │   ├── ProgressSection.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── lib/
│       └── gtag.ts         # Analytics configuration
├── public/                 # Static assets
│   └── images/            # Image assets
├── tailwind.config.js     # Tailwind configuration
└── package.json
```

## 🎨 Customization Guide

### **Colors & Branding**
Edit `tailwind.config.js` to update color scheme:
```javascript
colors: {
  primary: { /* Your brand colors */ },
  secondary: { /* Your secondary colors */ },
  accent: { /* Your accent colors */ }
}
```

### **Content Updates**
- **Restaurant Info**: Update contact details in `src/components/Footer.tsx`
- **Menu Items**: Modify menu preview in `src/app/page.tsx`
- **Images**: Replace images in `public/images/` directory
- **Analytics**: Update tracking events in `src/lib/gtag.ts`

### **Animations**
- **Speed**: Adjust duration values in Framer Motion components
- **Effects**: Modify `src/components/ParallaxSection.tsx` for parallax intensity
- **Carousel**: Customize rotation speed in `src/components/CircularCarousel.tsx`

## 🔒 Security Features

- **Input Validation**: Both client and server-side validation
- **Rate Limiting**: Prevents spam submissions
- **Environment Variables**: Sensitive data protection
- **CORS Configuration**: Secure API endpoints
- **XSS Protection**: Input sanitization

## 📊 Analytics Features

### **Admin Dashboard Metrics**
- Total visitors and page views
- Monthly and weekly visitor trends
- Top performing pages
- Device usage breakdown (mobile/desktop/tablet)
- Traffic sources (direct, search, social, referral)
- Real-time data updates

### **Custom Event Tracking**
- Reservation requests
- Menu section views
- Contact form submissions
- Phone call clicks
- Social media link clicks

## 🍽️ Restaurant-Specific Features

### **Reservation System**
- Date and time selection
- Party size specification
- Special requests handling
- Automatic email confirmations
- Admin notifications

### **Menu Integration Ready**
- Structured for menu categories
- Price display formatting
- Dietary restriction indicators
- Special offers highlighting

### **Contact Methods**
- Phone click-to-call
- Email integration
- Google Maps integration
- Business hours display
- Multiple location support

## 🚨 Troubleshooting

### **Common Issues**

**Analytics not working:**
- Verify GA_TRACKING_ID is correct
- Check browser console for errors
- Ensure gtag is loaded properly

**Email not sending:**
- Verify SMTP credentials
- Check spam folder
- Enable "Less secure app access" for Gmail (use App Passwords instead)

**Build errors:**
- Clear `.next` folder: `rm -rf .next`
- Delete node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

**Performance issues:**
- Optimize images (use WebP format)
- Enable Vercel Analytics
- Check bundle size: `npm run build && npx @next/bundle-analyzer`

## 📞 Support

For technical support or customization requests:

- **Email**: support@your-agency.com
- **Documentation**: Check inline code comments
- **Issues**: Create GitHub issue for bugs

## 📄 License

This template is proprietary software. Customize for client projects but do not redistribute the source code.

---

**Built with ❤️ for restaurant owners who want to stand out online.**

*Ready to deploy? Your restaurant's digital presence starts here!* 🚀# restaurant_template
