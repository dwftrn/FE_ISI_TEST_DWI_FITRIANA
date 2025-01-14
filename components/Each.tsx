import React from 'react'

interface EachProps<T> {
  render: (item: T, index?: number) => React.ReactNode
  of: T[]
}

export const Each = <T,>({ render, of }: EachProps<T>) =>
  React.Children.toArray(of.map((item, index) => render(item, index)))
