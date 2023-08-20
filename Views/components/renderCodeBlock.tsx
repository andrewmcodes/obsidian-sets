
import { render } from "solid-js/web";
import { Attribute, Query } from "src/Query";
import { VaultDB } from "src/VaultDB";
import { createStore } from "solid-js/store";
import { createSignal, onCleanup } from "solid-js";
import CodeBlock, { ViewMode } from "./CodeBlock";

const renderCodeBlock =  (db:VaultDB,query:Query, el:HTMLElement) => {
    const initialdata = db.query(query);
    console.log(`data: `, initialdata);

    const [data, setData] = createStore(initialdata);

    const [viewMode, setViewMode] = createSignal<ViewMode>("grid" as ViewMode);

    const onDataChanged = () => {
        const newData = db.query(query);
        setData(newData);
    }

    db.on("metadata-changed", onDataChanged);

    onCleanup(()=>{
        db.off("metadata-changed", onDataChanged);
    })

    const attributes : Attribute[] = [
        { tag: "file", attribute: "Name" },
        { tag: "metadata", attribute: "type", displayName: "Type" }
    ]

    render(()=><CodeBlock query={query} data={data} attributes={attributes} viewMode={{
        viewMode,setViewMode
    }} />, el);
}

export default renderCodeBlock;
