import React, { useEffect } from "react";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonItalic,
  MenuButtonTextColor,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditorProvider,
  RichTextField,
} from "mui-tiptap";



const RichText = ({ content, onContentChange }) => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    content: content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <RichTextEditorProvider editor={editor}>
      <RichTextField
        controls={
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuButtonBulletedList />
            <MenuButtonTextColor sx={{ zIndex: "1500" }} />
          </MenuControlsContainer>
        }
      />
    </RichTextEditorProvider>
  );
};

export default RichText;
