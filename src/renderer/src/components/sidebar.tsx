import React from 'react'

export const Sidebar = ({ className, children, ...props }: React.ComponentProps<'aside'>) => {
  return (
    <aside
      className={`w-[250px] mt-10 h-[calc(100dvh - 10px)] overflow-auto mx-2 h-full overflow-y-hidden`}
      {...props}
    >
      {children}
    </aside>
  )
}
