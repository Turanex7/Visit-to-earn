import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold'
export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-bg shadow-[0_10px_28px_-10px_rgba(25,181,199,0.75)] hover:brightness-110',
  secondary: 'border border-white/10 bg-surface-2 text-ivory hover:bg-[#21406f]',
  ghost: 'bg-transparent text-ivory hover:bg-white/5',
  danger: 'bg-nar text-ivory shadow-[0_10px_28px_-10px_rgba(200,40,59,0.7)] hover:brightness-110',
  gold: 'bg-gold text-bg shadow-[0_10px_28px_-10px_rgba(242,184,75,0.75)] hover:brightness-105',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-11 rounded-xl px-4 text-sm',
  md: 'h-12 rounded-2xl px-5 text-base',
  lg: 'h-14 rounded-2xl px-6 text-lg',
}

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  fullWidth = false,
  className?: string,
) {
  return cn(
    'inline-flex select-none items-center justify-center gap-2 font-bold transition duration-150 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
    VARIANTS[variant],
    SIZES[size],
    fullWidth && 'w-full',
    className,
  )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function Button({
  variant,
  size,
  loading = false,
  fullWidth,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, size, fullWidth, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <LoaderCircle className="size-5 animate-spin" aria-hidden /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
}

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

export function ButtonLink({ variant, size, fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, size, fullWidth, className as string | undefined)} {...props} />
}
