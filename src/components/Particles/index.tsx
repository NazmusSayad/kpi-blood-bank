import css from './index.module.scss'

export default function Particles() {
  return (
    <div className={css.container}>
      {Array.from({ length: 100 }, (_, i) => (
        <div key={i} className={css.circleContainer}>
          <div className={css.circle}></div>
        </div>
      ))}
    </div>
  )
}
