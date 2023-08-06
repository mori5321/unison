import { atom, useRecoilState } from "recoil";
import { createEditor } from "./client";
import { isLeft } from "fp-ts/lib/Either";

type Editor = {
  id: string;
}

type EditorsState = {
  editors: Editor[] 
}

const editorsState = atom({
  key: 'editorsState',
  default: {
    editors: []
  } as EditorsState
});

export const useEditors = () => {
  const [state, set] = useRecoilState(editorsState);

  const create = async () => {
    const res = await createEditor();

    if (isLeft(res)) {
      // TODO: how we handle error?
      throw new Error('Failed to create editor')
    }

    const editor = res.right;

    set({
      ...state,
      editors: [
        ...state.editors,
        editor,
      ]
    })
  }

  return {
    create,
  }
}
