import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '../ui/card';
import { GripVertical, RotateCcw, Trash2 } from 'lucide-react';
import { toast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';
import { SectionTemplates } from '@/types/dashboard';
interface Props {
    id:string;
    setFocusedSectionSlug:(val:string) => void;
    onDeleteSection:(e:any,val:string) => void;
    onResetSection:(e:any,val:string) => void;
    section:SectionTemplates;
    focusedSelectionSlug:string | null;
}
const Sortableitems = (props:Props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({id:props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    const onClickSection = () => {
        localStorage.setItem('current-focused-ring',props.id);
        props.setFocusedSectionSlug(props.id);
    }

    const onKeyUp = (e:React.KeyboardEvent<HTMLDivElement>) => {
        if(e.key.toLowerCase() === 'enter'){
            onClickSection();
        }
    }

    const onClickTrash = (e:React.MouseEvent<SVGSVGElement>) => {
        props.onDeleteSection(e,props.section.slug);
    }

    const onClickReset = (e:React.MouseEvent<SVGSVGElement>) => {
        toast({
            variant: "destructive",
            title: "Reset the template",
            description: "this section will be reset to default template; to contniue, click OK",
            action: <ToastAction altText="OK" onClick={() => {
                props.onResetSection(e,props.section.slug);
            }}>OK</ToastAction>,
        })
    }
    console.log('props?.section.slug === props.focusedSelectionSlug',props?.section.slug, props.focusedSelectionSlug)
    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            onKeyUp={onKeyUp}
            onClick={onClickSection}
            className='flex items-center w-3/4 justify-between '
        >   
            <span className='w-11/12 flex py-1 text-center text-nowrap justify-between '>
            <span {...listeners}>
                <GripVertical />
            </span>
            <span>{props?.section?.name && props?.section?.name.length>20 ? props?.section?.name.slice(0,15)+ '..' :props?.section?.name }</span>
            {/* {props?.section.slug === props.focusedSelectionSlug && ( */}
                {(<div className='flex space-x-2 text-nowrap '>
                    <RotateCcw 
                        onClick={onClickReset}
                        className='h-5 w-5'
                    />
                    <Trash2 
                        onClick={onClickTrash}
                        className='h-5 w-5'
                    />
                </div>
                )}
            </span>
        </Card>
    );
}
 
export default Sortableitems;