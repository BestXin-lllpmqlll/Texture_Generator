import { contextBridge, ipcRenderer } from 'electron';

export type SaveFileArgs = {
  defaultPath?: string;
  filters?: { name: string; extensions: string[] }[];
  data: string;
  encoding: 'base64' | 'utf8';
};

contextBridge.exposeInMainWorld('electron', {
  saveFile: (args: SaveFileArgs) =>
    ipcRenderer.invoke('dialog:saveFile', args) as Promise<{
      canceled: boolean;
      filePath?: string;
    }>,
  platform: process.platform,
});
