declare module '*.module.css' {
  export default Record<string, string>
}
declare module '*.module.scss' {
  export default Record<string, string>
}
declare module '*.module.sass' {
  export default Record<string, string>
}
declare module '*?url' {
  export default string
}
declare module '*.svg' {
  export default React.FC<React.ComponentProps<'svg'>>
}
