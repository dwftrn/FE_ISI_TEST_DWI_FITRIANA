import { forwardRef, InputHTMLAttributes } from 'react'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className='h-10 w-full rounded-lg bg-neutral-700 p-4 outline-none placeholder:text-neutral-400'
    />
  )
})

Input.displayName = 'Input'

export default Input
