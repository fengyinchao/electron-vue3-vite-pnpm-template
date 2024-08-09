/*
 * @Description: Image component.
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
declare module '*.png' {
  const src: string
  export default src
}

type Arch = 'noArch' | 'x64' | 'arm64'
type Platform = 'windows' | 'linux' | 'macos' | 'noPlatform'
