'use client'

import React, { useRef } from 'react'
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scaleDimensions = (): [number, number] => (isMobile ? [0.85, 1] : [1.04, 1])

  const rotate = useTransform(scrollYProgress, [0, 1], [12, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <div className="relative flex flex-col items-center justify-center py-10 md:py-16" ref={containerRef}>
      <div className="w-full relative" style={{ perspective: '1200px' }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: React.ReactNode
}) {
  return (
    <motion.div style={{ translateY: translate }} className="max-w-3xl mx-auto text-center mb-8">
      {titleComponent}
    </motion.div>
  )
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  children: React.ReactNode
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000000d, 0 9px 20px #0000000a, 0 37px 37px #00000008, 0 84px 50px #00000005',
      }}
      className="max-w-5xl mx-auto w-full rounded-[28px] border border-ink-100 bg-white p-3 md:p-6"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl">{children}</div>
    </motion.div>
  )
}
