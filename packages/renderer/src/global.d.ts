/*
 * @Description: Global component.
 * @Author: Feng Yinchao
 * @Date: 2024-07-24 13:56:08
 */
import type { IpcMainHandleEventProxy, IpcRenderer, IpcRendererOnEventCalleeProxy } from '@type/ipc'
import type { DialogApiInjection } from 'naive-ui/lib/dialog/src/DialogProvider'
import type { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'

export {}

declare global {
  interface Window {
    // Expose some Api through preload script
    ipcRenderer: IpcRenderer
    removeLoading: () => void
    $message: MessageApiInjection
    $dialog: DialogApiInjection
    updateLoadingText: (text: string) => void

    main: IpcMainHandleEventProxy
    renderer: IpcRendererOnEventCalleeProxy
  }
}
