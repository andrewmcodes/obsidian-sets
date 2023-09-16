import { create } from "domain";
import { useBlock } from "./BlockProvider";
import { Component, createEffect } from "solid-js";
import { Menu, setIcon } from "obsidian";

const ViewMode:Component = () => {
    const { definition, setDefinition, save } = useBlock()!;
    let icon:HTMLDivElement;
    const viewMode = () => definition().viewMode || "grid";

    createEffect(() => {
        const mode = viewMode();
        switch (mode) {
           
            case "list":
                setIcon(icon, "list");
                break;
            default:
                setIcon(icon, "table");
                break;
        }
    })

    const onClick = (e:MouseEvent) => {
        const menu = new Menu();
        menu.addItem((item) => {
            item.setTitle("Grid");
            item.setIcon("table");
            item.onClick(() => {
                setDefinition({...definition(), viewMode: "grid"});
                save();
            })
        }
        );
        menu.addItem((item) => {
            item.setTitle("List");
            item.setIcon("list");
            item.onClick(() => {
                setDefinition({...definition(), viewMode: "list"});
                save();
            })
        }
        );
        menu.showAtMouseEvent(e);
        
    }

    return <div ref={icon!} class="clickable-icon" onClick={onClick}></div>
}

export default ViewMode;
