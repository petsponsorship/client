import dynamic from 'next/dynamic';
import styles from '../contents/QuillEditor.module.css';
import 'react-quill/dist/quill.snow.css';

const QuillEditor = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
    ['image'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

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

export default function Editor({ setHtml }) {
  return (
    <QuillEditor
      onChange={setHtml}
      className={styles.quill}
      modules={modules}
      formats={formats}
      placeholder={'후원받고자 하는 동물의 자세한 정보를 입력해주세요!'}
      theme="snow"
    />
  );
}
