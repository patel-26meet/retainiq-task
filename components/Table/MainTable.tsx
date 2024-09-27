import React, { useState, useRef, useEffect } from 'react';
import { DndProvider, useDrag, useDrop, ConnectDragSource } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Grip, Plus, Trash2 } from 'lucide-react';

interface RowData {
    id: string;
    col1: string;
    [key: string]: string;
}
 
interface DraggableRowProps {
    id: string;
    index: number;
    moveRow: (dragIndex: number, hoverIndex: number) => void;
    children: (dragSource: ConnectDragSource) => React.ReactNode;
}
 
interface DragItem {
    type: string;
    id: string;
    index: number; 
}

interface RowData {
    id: string;
    col1: string;
    [key: `col${number}`]: string;
}

const DraggableRow = ( { id, index, moveRow, children } : DraggableRowProps) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'row',
        hover(item: DragItem) {
        if (!ref.current) return;

        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) return;
        moveRow(dragIndex, hoverIndex);
        item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag<DragItem, unknown, {isDragging: boolean}>({
        type: 'row',
        item: { type:'row', id, index },
        collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0.75 : 1 }} className="flex group">
          {children(drag)}
        </div>
    );
};


const MainTable = () => {
  const [data, setData] = useState<RowData[]>([
    { id: 'row-0', col1: 'Content 1', col2: '1', col3: '11', col4: '111' },
    { id: 'row-1', col1: 'Content 2', col2: '2', col3: '22', col4: '222' },
    { id: 'row-2', col1: 'Content 3', col2: '3', col3: '33', col4: '333' },
  ]);
  const [columns, setColumns] = useState(5);
  const scrollContainerRef = useRef(null);

  const addRow = () => {
    const newRow = {
      id: `row-${data.length}`,
      col1: `Content ${data.length + 1}`,
      ...Object.fromEntries([...Array(columns - 1)].map((_, i) => [`col${i + 2}`, '']))
    };
    setData([...data, newRow]);
  };

  const addColumn = () => {
    setColumns(columns + 1);
    setData(data.map(row => ({ 
        ...row, 
        [`col${columns + 1}`]: '' 
    })));
  };

  const deleteRow = (id: string) => {
    setData(data.filter(row => row.id !== id));
  };

  const deleteColumn = (id: number) => {
    setData(data.map(row => {
      const tempRow = { ...row };
      delete tempRow[`col${id + 2}`];
      return tempRow;
    }));
    setColumns(columns - 1);
  };

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const dragRow = data[dragIndex];
    setData(
      data.reduce((acc: RowData[], row, idx) => {
        if (idx === dragIndex) return acc;
        if (idx === hoverIndex) {
          return [...acc, dragIndex < hoverIndex ? row : dragRow, dragIndex < hoverIndex ? dragRow : row];
        }
        return [...acc, row];
      }, [])
    );
  };

  useEffect(() => {
    console.log('Data:', data)
  }, data)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full h-screen overflow-hidden text-[#657382] font-bold">
      <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                display: none;
                }
                .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
                }
                .custom-scrollbar {
                overflow-y: scroll;
                scrollbar-width: none;
                -ms-overflow-style: none;
                }
                .custom-scrollbar::-webkit-scrollbar {
                width: 0;
                height: 0;
                }
    `}</style>

        <div className="h-full custom-scrollbar">
          <div className="flex">
            {/* Fixed columns */}
            <div className="flex-shrink-0">
              {/* Fixed header */}
              <div className="flex">
                <div className="w-28 shrink-0 p-4 font-medium text-lg border-r-0 border-b-0 border-gray-200 bg-gray-50 h-20"></div>
                <div className="w-[400px] shrink-0 p-4 font-medium text-lg border-r border-b-0 border-gray-200 bg-gray-50 h-20 flex justify-center items-center mb-6 ml-5">Product Filter</div>
              </div>

              {/* Fixed body columns */}
              {data.map((row, rowIndex) => (
                <DraggableRow key={row.id} id={row.id} index={rowIndex} moveRow={moveRow}>
                  {(dragRef) => (
                    <>
                      <div className="w-28 text-black shrink-0 p-4 border-r border-b-0 border-gray-200 flex items-center h-[200px] relative mt-[3px] mb-6 ml-5">
                        <Trash2
                          className="ml-2 text-red-500 cursor-pointer absolute right-2 hidden group-hover:block"
                          size={24}
                          onClick={() => deleteRow(row.id)}
                        />
                        <span className="text-xl">{rowIndex + 1}</span>
                        <div {...dragRef} className="ml-4 cursor-move">
                          <Grip size={24} />
                        </div>
                      </div>
                      <div className="w-[400px] shrink-0 p-4 border-r border-b-0 border-gray-200 h-[200px]">
                        <div className="text-lg font-medium text-gray-900 p-2 rounded">
                          <div className="h-40 bg-white rounded-md border border-dashed border-gray-300 flex items-center justify-center">
                            {row.col1}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </DraggableRow>
              ))}

              {/* Add Row button */}
              <div className="flex mb-6 ml-5">
                <div className="w-[428px] p-4">
                  <button onClick={addRow} className="px-6 py-3 bg-white text-black border border-gray-300 rounded hover:bg-gray-100 text-lg flex items-center justify-center">
                    <Plus size={24} className="mr-2" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable columns */}
            <div className="flex-1 overflow-x-auto hide-scrollbar" ref={scrollContainerRef}>
              <div style={{ width: `${Math.max(3, columns - 2) * 300}px` }}>
                {/* Scrollable header */}
                <div className="flex">
                  {[...Array(columns - 2)].map((_, index) => (
                    <div key={`header-${index}`} className="w-[300px] shrink-0 p-4 font-medium text-lg border-r border-b-0 border-gray-200 bg-gray-50 h-20 flex justify-between items-center mb-6">
                      <div className='ml-10'>
                        {index === 0 ? 'Primary ' : ''} Variant {index > 0 ? index + 1 : ''}
                      </div>
                      <button onClick={() => deleteColumn(index)} className='mr-7'><Trash2 /></button>
                    </div>
                  ))}
                </div>

                {/* Scrollable body columns */}
                {data.map((row) => (
                  <div key={`scroll-${row.id}`} className='flex'>
                    <div className="flex group">
                      {[...Array(columns - 2)].map((_, colIndex) => (
                        <div key={`cell-${row.id}-${colIndex}`} className="w-[300px] shrink-0 p-4 border-r border-b-0 border-gray-200 h-[200px] flex justify-center items-center mt-[3px] mb-6">
                          <div className="w-40 h-40 bg-white rounded-md border border-dashed border-gray-300"></div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-11 w-[100px] shrink-0 p-4 font-medium text-lg border-r-0 border-b-0 border-gray-200 bg-gray-50 h-20 flex justify-center">
                      <button onClick={addColumn} className="px-6 py-3 bg-white text-black border border-gray-300 rounded hover:bg-gray-100 text-lg flex items-center justify-center">
                        <Plus size={24} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default MainTable;