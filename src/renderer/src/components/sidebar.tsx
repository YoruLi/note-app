import React from 'react'
import PropTypes from 'prop-types'

export const Sidebar = ({ children, ...props }: React.ComponentProps<'aside'>) => {
  return (
    <aside
      className={`${props.className} w-[250px] mt-10 h-[calc(100dvh - 10px)] overflow-auto mx-2 h-full overflow-y-hidden `}
    >
      {children}
    </aside>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}
