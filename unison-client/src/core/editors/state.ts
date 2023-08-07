import { atom, useRecoilState } from "recoil";
import { createEditor, listEditors } from "./client";
import { isLeft } from "fp-ts/lib/Either";

type Editor = {
  id: string;
}

type EditorsState = {
  editors: Editor[] 
}

const editorsState = atom<EditorsState>({
  key: 'editorsState',
  default: new Promise(async (resolve, reject) => {
    const resp = await listEditors();
    if (isLeft(resp)) {
      reject(resp.left)
    } else {
      resolve({
        editors: resp.right.data
      })
    }
  })
});

export const useEditors = () => {
  const [state, set] = useRecoilState(editorsState);

  const create = async () => {
    const res = await createEditor();

    if (isLeft(res)) {
      // TODO: how we handle error?
      throw new Error('Failed to create editor')
    }

    const editor = res.right.data;

    set({
      ...state,
      editors: [
        ...state.editors,
        editor,
      ]
    })
  }

  const editors = state.editors;

  return {
    editors,
    create,
  }
}
