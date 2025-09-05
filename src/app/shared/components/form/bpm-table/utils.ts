
/**
 * This file contains the default functionality for the datatable
**/

import { IColumn } from "@shared/models/table.model";

/**
 * Ensures string is safe for html
*/
function escapeHtml(value: string){
    var htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    var htmlEscaper = /[&<>"'\/]/g;
    return ('' + value).replace(htmlEscaper, (match)=>htmlEscapes[match]);
}

/**
 * Returns a function that checks if any of the values of an object matches the query
**/
function getFilter(options){
    return (data: any, filter: string): boolean => {
        if(!options.caseSensitive) filter = filter.toLowerCase();
        return Object.values(data).some(value=>{
            if(!options.caseSensitive) value = String(value).toLowerCase();
            return String(value).trim().indexOf(filter.trim())!==-1
        });
    };
}

/**
 * Constructs html for printing the results of the table
 * TODO Just set num records to all and print table
**/
function getPrintableHTML(columns: IColumn[], data: any[]): string{
    const headerColumns = columns.reduce((p, c)=>{return !c.options.print?p:`${p}<th>${c.label}</th>`},'');
    const header = `<tr>${headerColumns}</tr>`;
    const rows = '<tr>'+data.reduce((p,c)=>{
        return p+columns.reduce((p2,c2)=>{
            return !c2.options.print?p:`${p2}<td>${escapeHtml(c[c2.name])}</td>`;
        },'')+'</tr>';
    },'');
    const table = `<table style="width:100%;height:100%">${header}${rows}</table>`;
    const style=`
    <style>
        tr{width:100%;height:48px;}
        td{border-bottom:1px solid #E0E0E0;}
        th{color: #383838;border-bottom:1px solid #E0E0E0;text-align:left;}
        td:first-of-type{padding-left:5px;}
        th:first-of-type{padding-left:5px;}
        body{font-family: Roboto,"Helvetica Neue",sans-serif;}
        table{
            box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
            border-spacing: 0;
        }
    </style>`;
    return `${style}${table}`
}

/**
 * Constructs a webpage from a html string and prints it
**/
function printHtml(html: string){
    const printWindow = window.open('', '', 'height=400,width=600');
    const doc = `<html><head></head><body>${html}</body></html>`;
    printWindow.document.write(doc);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

export { getFilter, getPrintableHTML, printHtml};