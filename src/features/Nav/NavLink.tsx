import { NavLink } from 'react-router-dom'

export default function AppNavLink(props: Props) {
  return (
    <NavLink
      to={props.to}
      className={tw(
        'transition-all opacity-100 bg-transparent px-4 py-[0.4rem] rounded-lg font-medium',
        'hover:bg-red-800/20'
      )}
    >
      {props.label}
    </NavLink>
  )
}

type Props = {
  to: string
  label: string
}
