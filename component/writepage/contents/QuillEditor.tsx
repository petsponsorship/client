import styles from '../contents/QuillEditor.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useMemo } from 'react';
import { imageApi } from '../../../apis/posts';

export default function Editor({ html, setHtml }) {
  const quillRef = useRef(null);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files[0];

      try {
        const result = await imageApi({ img: file });
        console.log('result', result);
        const imgUrl = result.data.imgUrl;
        const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
        console.log('editor', editor);
        // editor.root.innerHTML = editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`; // 현재 있는 내용들 뒤에 써줘야한다.
        // const range = quillRef.current.getEditorSelection();
        // quillRef.current.getEditor().insertEmbed(range.index, 'image', IMG_URL);
        // quillRef.current.getEditor().setSelection(range.index + 1);
        // // 2. 현재 에디터 커서 위치값을 가져온다
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', imgUrl);
        editor.setSelection(range.index + 1);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['image'],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'align',
    'image',
  ];

  return (
    <ReactQuill
      ref={quillRef}
      onChange={setHtml}
      className={styles.quill}
      modules={modules}
      formats={formats}
      value={html}
      placeholder={'후원받고자 하는 동물의 자세한 정보를 입력해주세요!'}
      theme="snow"
    />
  );
}
