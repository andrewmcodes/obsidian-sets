import { Component } from "solid-js";
import { useGrid } from "./GridProvider";
import {
   
    createSortable,
} from "@thisbeyond/solid-dnd";

export const Header: Component<{ name: string; key: string; }> = (props) => {
    const gridContext = useGrid();
    const { state, onHover, onExit } = gridContext!;
    const sortable = createSortable(props.key);

    const onMouseOver = (e) => {
        if (gridContext !== undefined) {

            onHover(props.key);
        }
    }

    const onMouseLeave = (e) => {
        if (gridContext !== undefined) {
            onExit();
        }
    }

    const isHovering = () => {
        return state?.().hovering === props.key;
    }


    return (

            <div class="sets-header-cell"
                classList={{
                    hovered: isHovering()
                }}
                // use: draggable
                use:sortable
                onmouseover={onMouseOver}
                onmouseleave={onMouseLeave}

            >
                <div class="sets-cell-content">
                    <div>{props.name}</div>
                    <div class="sets-column-resizer"></div>
                </div>
            </div>
        );
};
