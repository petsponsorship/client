import styles from '../contents/QuillEditor.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useMemo } from 'react';
import { imageApi } from '../../../apis/posts';
import { getImgUpload } from '../../../helpers/functions';

export default function QuillEditor({ html, setHtml }) {
  const quillRef = useRef(null);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const file = await getImgUpload(input.files[0]);
      try {
        const res = await imageApi({ img: file });
        const imgUrl = res.data.imgUrl;
        const editor = quillRef.current.getEditor(); // 에디터 객체 가져오기
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
