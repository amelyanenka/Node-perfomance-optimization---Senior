import { useEffect, useState } from 'react';

import {
  ColumnInterface,
  MaterialInterface,
  WearLimitsInterface,
  WearLimitsPageInterface,
} from './../../interface/Sales.interface';
import { limits } from './limits.data';

const useHelp = () => {
  const [columns, setColumns] = useState<ColumnInterface[]>([]);
  const [data, setData] = useState<WearLimitsInterface[]>([]);
  const [materials, setMaterials] = useState<MaterialInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [edited, setEdited] = useState<number[]>([]);
  const [rowInput, setRowInput] = useState('');
  const [hel, setHel] = useState<any>();
  const [sibTimer, setSibTimer] = useState<NodeJS.Timer>();
  const [inTable, setInTable] = useState(false);

  async function loadColumns(materials: MaterialInterface[]) {
    const materialsCopy = materials.map((material) => ({ ...material }));

    const columnsCore: ColumnInterface[] = [
      {
        label: 'Platform',
        name: 'platformName',
        uuid: 'platformName',
        minWidth: 150,
        orderBy: 'asc',
      },
      {
        label: 'Model',
        uuid: 'salesModelName',
        name: 'salesModelName',
        minWidth: 100,
        orderBy: 'asc',
      },
      {
        label: 'Point',
        uuid: 'samplingPointName',
        name: 'samplingPointName',
        minWidth: 160,
        orderBy: 'asc',
      },
      {
        label: 'Part number',
        uuid: 'componentPartNr',
        name: 'componentPartNr',
        minWidth: 160,
        orderBy: 'asc',
      },
    ];
    materialsCopy.map((el) => (el.checked = true));
    setMaterials(materialsCopy);
    setColumns(columnsCore.concat(materialsCopy));
  }

  async function loadData(limits: WearLimitsPageInterface) {
    setIsLoading(true);
    const res: WearLimitsPageInterface = limits;
    setData(res.wearLimits);
    loadColumns(res.material);
    setEdited([]);
    setIsLoading(false);
  }

  function setOutTable() {
    if (hel) {
      setInTable(false);
      hel.style.borderBottom = '1px solid rgba(224, 224, 224, 1)';
      if (hel.children) {
        hel?.children[1]?.children[0]?.children[0]?.blur();
      }
    }
  }

  window.addEventListener('click', function (e: any) {
    if (!document?.getElementById('paperScroll')?.contains(e.target)) {
      setOutTable();
    }
  });

  function dotheneedful(sibling: HTMLElement) {
    setTimeout(() => {
      setInTable(true);
    }, 0);
    if (sibTimer) {
      clearInterval(sibTimer);
    }
    const sibTime = setInterval(() => {
      if (sibling) {
        while (sibling.tagName !== 'TD') {
          sibling = sibling.parentElement as HTMLElement;
        }
        if (hel) {
          hel.focus();
          hel.style.borderBottom = '1px solid rgba(224, 224, 224, 1)';
          if (hel.children) {
            hel?.children[1]?.children[0]?.children[0]?.blur();
          }
        }

        sibling.focus();
        sibling.style.borderBottom = '1px solid #1976d2';
        setRowInput(sibling.dataset.editable as string);

        setHel(sibling);
        clearInterval(sibTimer);
      }
    }, 100);
    setSibTimer(sibTime);
  }

  useEffect(() => {
    if (sibTimer) {
      setTimeout(() => {
        clearInterval(sibTimer);
      }, 100);
    }
  }, [sibTimer]);

  document.onkeydown = checkKey;

  function checkKey(e: KeyboardEvent) {
    if (!inTable) return;

    e = e || window.event;
    if (e.keyCode === undefined) {
      return;
    }
    const keyCode = e.keyCode;
    if (keyCode === 38) {
      // up arrow
      const idx = hel.cellIndex;
      const nextrow = hel.parentElement.previousElementSibling;
      if (nextrow != null) {
        const sibling = nextrow.cells[idx];
        dotheneedful(sibling);
      }
    } else if (keyCode === 40) {
      // down arrow
      const idx = hel.cellIndex;
      const nextrow = hel.parentElement.nextElementSibling;
      if (nextrow !== null) {
        var sibling = nextrow.cells[idx];
        dotheneedful(sibling);
      }
    } else if (keyCode === 37) {
      // left arrow
      const sibling = hel.previousElementSibling;
      dotheneedful(sibling);
    } else if (keyCode === 39) {
      // right arrow
      const sibling = hel.nextElementSibling;
      dotheneedful(sibling);
    } else if (keyCode === 13) {
      const paperScroll = document.getElementById('paperScroll');
      paperScroll?.scroll({
        top: hel.offsetTop - 200,
        left: hel.offsetLeft - 200,
        behavior: 'smooth',
      });
    } else {
    }
  }

  useEffect(() => {
    if (hel) return;

    const start = document.getElementById('start');
    if (start) {
      start.focus();
      setHel(start);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    loadData(limits);
  }, []);

  function onChangeLimit(rowIndex: number, materialIndex: number, index: number, value: string) {
    const regex = /^[.0-9]*$/;
    if (!regex.test(value)) {
      return;
    }
    const editedData = [...data];
    if (!edited.length) {
      const row = JSON.parse(JSON.stringify(data[rowIndex]));
      row.materials[materialIndex].limits[index].value = value;
      editedData[rowIndex] = row;
    } else {
      edited.forEach((editedIndex) => {
        const row = JSON.parse(JSON.stringify(data[editedIndex]));
        if (row.materials[materialIndex].editable) {
          row.materials[materialIndex].limits[index].value = value;
          editedData[editedIndex] = row;
        }
      });
    }
    setData([...editedData]);
  }

  function onChangeRowChecked(row: WearLimitsInterface, index: number) {
    const indexs = [...edited];
    if (!indexs.includes(index)) {
      setEdited([...indexs, index]);
    } else {
      indexs.splice(edited.indexOf(index), 1);
      setEdited(indexs);
    }
  }

  function onChangeAllChecked() {
    if (edited.length) {
      setEdited([]);
    } else {
      setEdited(Array.from(Array(data.length).keys()));
    }
  }

  return {
    rowInput,
    setRowInput,
    edited,
    setEdited,
    isSuccess,
    setIsSuccess,
    error,
    setError,
    edit,
    setEdit,
    isLoading,
    columns,
    materials,
    data,
    onChangeAllChecked,
    onChangeRowChecked,
    onChangeLimit,
    dotheneedful,
  };
};
export default useHelp;
