import { MarkdownPostProcessorContext } from "obsidian";
import SetsPlugin from "../main";
import CodeBlock from "src/Views/components/renderCodeBlock";
import { Query } from "../Data/Query";



export function processCodeBlock(source: string, el: HTMLElement, plugin: SetsPlugin, ctx: MarkdownPostProcessorContext) {
    // TODO: actual read source
    // and create Query with filters

    const query = Query.fromClauses([
        {
            operator: "eq",
            attribute: { tag: "metadata", attribute: "type" },
            value: "meeting"
        }
    ]);

    CodeBlock(plugin.vaultDB,query, el);
}
