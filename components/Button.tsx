import { SpinnerIos16Filled } from '@fluentui/react-icons'
import { forwardRef } from 'react'

const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }>(
  ({ isLoading = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className='flex h-10 items-center justify-center rounded-lg bg-neutral-700 p-4 text-sm font-medium text-white'
        {...props}
      >
        {children}
        {isLoading && <SpinnerIos16Filled className='ml-2 animate-spin' />}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
