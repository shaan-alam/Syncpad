import { atom } from 'jotai';
import { Workspace } from '@prisma/client'


export const workspaceAtom = atom<Workspace | null>(null)