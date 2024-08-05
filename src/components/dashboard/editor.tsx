'use strict'
import useLocalStorage from "@/hooks/use-local-storage";
import { Editor ,Monaco} from "@monaco-editor/react";
// import monacoThemes from 'monaco-themes';
import { useEffect, useRef, useState } from 'react';

const MarkDownEditor = ({
    focusedSelectionSlug,
    templates,
    setTemplates
}) => {
    const  monacoEditorRef = useRef<Monaco>();
    const [MonacoEditor, setMonacoEditor] = useState(null);
    const { saveBackUp } = useLocalStorage()
    // get Markdown
    const getMarkDown = () => {
        const section =  templates.find((s) => s.slug === focusedSelectionSlug);
        console.log('section',section,templates,focusedSelectionSlug)
        return section ? section.markdown : '';
    }
    const [markdown, setMarkdown] = useState(getMarkDown());
    const handleEditorDidMount = (editor) => {
        monacoEditorRef.current = editor;
        // setEditorColorThemeFromLocalStorage();
    };
    const onEdit = (val) => {
        console.log('val',val)
        setMarkdown(val);

        const newTemplates = templates && templates.length>0 && templates.map((template) => {
            if(template.slug === focusedSelectionSlug){
                return {...template,markdown:val};
            }
            return template
        }) 
        setTemplates(newTemplates);
        saveBackUp(newTemplates);
    }

    useEffect(() => {
        if(!MonacoEditor){
            console.log('Enter in MONACO EDITOR')
            import("@monaco-editor/react").then((EditorComp) => {
                setMonacoEditor(EditorComp.default);
            });
        }
    },[MonacoEditor,setMonacoEditor])

    console.log('MonacoEditor',MonacoEditor)
    useEffect(() => {
        const markdown = getMarkDown();
        setMarkdown(markdown);
    },[focusedSelectionSlug,templates])
    console.log('markdown',markdown)
    return (
        <div className='flex w-full space-x-4'>
            {
                MonacoEditor && (
                <MonacoEditor 
                    onMount={handleEditorDidMount}
                    wrapperClassName="rounded-sm border border-gray-500"
                    theme={'vs-dark'}
                    language="markdown"
                    value={markdown}
                    onChange={onEdit}
                    loading={"Loading..."}
                    height={'100vh'}
                    aria-label="Markdown Editor"
                />)
            }
        </div>
    );
}

export default MarkDownEditor;