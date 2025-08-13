// src/lib/motion.ts
// Temporary shim for framer-motion to bypass TS type conflicts
// Remove when framer-motion types match your TS setup

import {
  motion as _motion,
  AnimatePresence as _AnimatePresence,
  useScroll as _useScroll,
  useTransform as _useTransform,
  useInView as _useInView
} from 'framer-motion'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const motion: any = _motion
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnimatePresence: any = _AnimatePresence
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useScroll: any = _useScroll
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useTransform: any = _useTransform
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useInView: any = _useInView

export { motion, AnimatePresence, useScroll, useTransform, useInView }
