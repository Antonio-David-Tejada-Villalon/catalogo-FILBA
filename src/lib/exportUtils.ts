"use client";

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CartItem } from '@/hooks/useCart';

declare global {
  interface Window {
    showSaveFilePicker?: (options?: any) => Promise<FileSystemFileHandle>;
  }
}

export const exportToExcel = async (items: CartItem[], fileName: string) => {
  const data = items.map(item => ({
    Cantidad: item.cantidad,
    Título: item.titulo,
    Autor: item.autor,
    Editorial: item.editorial
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedido');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  await saveFile(blob, `${fileName}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
};

export const exportToPDF = async (items: CartItem[], fileName: string) => {
  const doc = new jsPDF();
  
  const tableColumn = ['Cant', 'Título', 'Autor', 'Editorial'];
  const tableRows = items.map(item => [
    item.cantidad,
    item.titulo,
    item.autor,
    item.editorial
  ]);

  doc.setFontSize(18);
  doc.text('Catálogo de Libros - Pedido', 14, 20);
  
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 14, 30);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    theme: 'grid',
    headStyles: { fillColor: [255, 140, 0] }, // Use Orange theme color
    alternateRowStyles: { fillColor: [245, 245, 247] },
  });

  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text(`Este documento es una solicitud de presupuesto para direccionbpsj@gmail.com`, 14, finalY);

  const pdfBlob = doc.output('blob');
  await saveFile(pdfBlob, `${fileName}.pdf`, 'application/pdf');
};

const saveFile = async (blob: Blob, fileName: string, mimeType: string) => {
  if (typeof window !== 'undefined' && window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: fileName,
        types: [{
          description: 'Documento',
          accept: { [mimeType]: [`.${fileName.split('.').pop()}`] },
        }],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (err) {
      console.error('File Picker was cancelled or failed', err);
    }
  }

  // Fallback for browsers that don't support showSaveFilePicker
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
  window.URL.revokeObjectURL(url);
};
