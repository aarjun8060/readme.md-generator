'use client'
import EditorPreviewPage from "@/components/dashboard/editor-container";
import SectionColumn from "@/components/dashboard/section-column";
import useLocalStorage from "@/hooks/use-local-storage";
import useDeviceDetect from "@/hooks/use-mobile-detect";
import { DownloadModal } from "@/components/dashboard/download-modal";
import { ModeToggle } from "@/components/global/mode-toggle";
import { Button } from "@/components/ui/button";
import { sectionTemplates } from "@/providers/data/section-templates";
import { 
    useEffect, 
    useState 
} from "react";
import { 
    Download, 
    RotateCcw 
} from "lucide-react";
import { SectionTemplates } from "@/types/dashboard";
import { arrayMove } from "@dnd-kit/sortable";


const Editor = () => {
    const { isMobile } = useDeviceDetect();
    const [selectionSlugs, setSectionSlugs] = useState<string[]>(sectionTemplates.map((t) => t.slug));
    const [selectedSelectionSlugs, setSelectedSelectionSlugs] = useState<string[]>([]);
    const [focusedSelectionSlug, setFocusedSelectionSlug] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [templates, setTemplates] = useState<SectionTemplates[]>(sectionTemplates);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const {
        backUp,
        saveBackUp
    } = useLocalStorage();
    const toggleModal = () => setShowModal(prevState => !prevState);
    useEffect(() => {
        if (backUp) {
            setTemplates(backUp);
        }
    }, [backUp])

    const getTemplate = (slug: string):SectionTemplates | undefined => {
        return templates.find((t:SectionTemplates) => t.slug === slug);
    }

    useEffect(() => {
        setFocusedSelectionSlug(null);
    }, [])

    useEffect(() => {
        let currentSlugList = localStorage.getItem('current-slug-list');
        if (
            currentSlugList?.indexOf('title_and_description') == -1 &&
            selectedSelectionSlugs.indexOf('title_and_description') > -1
        ) {
            selectedSelectionSlugs.splice(
                selectedSelectionSlugs.indexOf('title_and_description'), 1
            )
        }

        // setFocusedSelectionSlug(
        //     currentSlugList && currentSlugList.split(',')[0]
        // )

        localStorage.setItem('current-slug-list', JSON.stringify(selectedSelectionSlugs));
    }, [selectedSelectionSlugs])

    const onMenuClick = () => setShowDrawer(!showDrawer)
    const markdown =  selectedSelectionSlugs && selectedSelectionSlugs.length>0 ? selectedSelectionSlugs?.reduce((acc, section:string) => {
        console.log('acc',acc,'section',section)
        const template = getTemplate(section);
        if (template) {
          return `${acc}${template?.markdown}`;
        } else {
          return acc;
        }
      }, ``) : '';
    
      const downloadMarkDownFile = () => {
        const a = document.createElement('a');
        const blob = new Blob([markdown]);
        a.href = URL.createObjectURL(blob);
        a.download = 'README.md';
        a.click();
        if (isMobile && showDrawer) {
          onMenuClick();
        }
        setShowModal(true);
      }
      const filterSelectedSectionSlugs = (sectionSlug: string): void => {
        setSelectedSelectionSlugs((prev) => {
          if (prev) {
            return prev.filter((s) => s !== sectionSlug);
          }
          return [];
        });
      };

      const filterSectionSlugs = (sectionSlug: string): void => {
        setSectionSlugs((prev) => {
          if (prev) {
            return prev.filter((s) => s !== sectionSlug);
          }
          return [];
        });
      };

      const addSelectedSectionSlug = (section: string): void => {
        setSelectedSelectionSlugs((prev: string[]) => [...prev, section]);
      };
      const addSectionSlug = (section: string): void => {
        setSectionSlugs((prev: string[]) => [...prev, section]);
      };

      const handleDragEnd = (event:any) :void => {
        const { active, over } = event;
        if(active.id !== over.id){
            setSelectedSelectionSlugs((sections:string[]) => {
                console.log('sections',sections);
                const oldIndex = sections && sections.findIndex((s) => s === active.id)
                const newIndex = sections && sections.findIndex((s) => s === over.id)
                if (oldIndex === -1 || newIndex === -1) {
                    return sections;
                }
                return arrayMove(sections,oldIndex,newIndex);
            })
        }
        }

        const addTemplates = (section:SectionTemplates)=> {
            setTemplates((prev) => {
                const newTemplate = [...prev,section];
                saveBackUp(newTemplate)
                return newTemplate;
            })
        }
    return (
        <div>
            {showModal && <DownloadModal setShowModal={toggleModal} />}

            <div className="w-full flex h-full">
                <div className="w-1/5 h-full">
                    <SectionColumn
                    selectedSectionSlugs={selectedSelectionSlugs}
                    setSelectedSectionSlugs={setSelectedSelectionSlugs}
                    sectionSlugs={selectionSlugs}
                    setFocusedSectionSlug={setFocusedSelectionSlug}
                    focusedSelectionSlug={focusedSelectionSlug}
                    setTemplates={setTemplates}
                    getTemplate={getTemplate}
                    filterSelectedSectionSlugs={filterSelectedSectionSlugs}
                    filterSectionSlugs={filterSectionSlugs}
                    addSelectedSectionSlug={addSelectedSectionSlug}
                    addSectionSlug={addSectionSlug}
                    handleDragEnd={handleDragEnd}
                    addTemplates={addTemplates}
                    /> 
                </div>
                <div className="w-4/5 flex flex-col h-full">
                    <div className="w-full flex justify-end px-4 py-1  shadow-lg border-b-1 mb-2">
                        <aside className="flex space-x-2 items-center py-1">

                            <Button variant={"destructive"} className="space-x-2 text-lg">
                                <RotateCcw /> Reset
                            </Button>
                            <div
                                onClick={downloadMarkDownFile}
                                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80 text-nowrap flex items-center justify-center space-x-2"
                            >
                                <span><Download /></span><span>Download</span>
                            </div>

                            <ModeToggle />
                        </aside>
                    </div>
                    <div className="w-full h-full">
                        <EditorPreviewPage
                            selectedSectionSlugs={selectedSelectionSlugs}
                            focusedSelectionSlug={focusedSelectionSlug}
                            templates={templates}
                            setTemplates={setTemplates}
                            getTemplate={getTemplate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editor;