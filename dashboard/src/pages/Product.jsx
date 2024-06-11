import React, { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/material";

const Product = () => {
  const [statesProducts, setStatesProducts] = useState({
    loading: true,
    products: [],
    error: "",
  });

  const [dataGrid, setDataGrid] = useState({
    columns: [],
    rows: [],
  });

  useEffect(() => {
    const endpoint = "http://localhost:3030/api/products?limit=10000";
    const getProducts = async () => {
      try {
        const {
          ok,
          data = [],
          msg = null,
        } = await fetch(endpoint).then((res) => res.json());

        if (!ok) throw new Error(msg);

        ok &&
          setStatesProducts({
            ...statesProducts,
            products: data,
            loading: false,
          });
      } catch (error) {
        setStatesProducts({
          ...statesProducts,
          error: error.message,
        });
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    /* console.log(statesProducts.products); */
    const dataObjProduct = Object.entries(
      statesProducts.products.length ? statesProducts.products[0] : {}
    );

    const listWrite = ["id", "title", "price", "description"];
    const headerNameTable = {id: "ID", title: "TITULO", price: "PRECIO", description: "DESCRIPCIÓN"}
    const columnsFormat = dataObjProduct
      .filter(([key, value]) => listWrite.includes(key))
      .map(([key, value]) => {
          // [ "id" , 1 ] iteración 1
          // [ "title" , "COMIDA 1" ] iteración 2
          // [ "price" , 100 ] iteración 3
          // [ "description" , "asdjhbdskhbjdaskjhbadskjhb" ] iteración 4

        return {
          field: key,
          headerName: headerNameTable[key], // headerNameTable["description"] -> value -> asdjhbdskhbjdaskjhbadskjhb
          width: 150,
          type: typeof value,
          editable: true
        };

        /* 
        const columnsProduct = [
        {
          field: "id",
          headerName: "ID",
          width: 150,
          type: "number",
        },
        {
          field: "title",
          headerName: "Titulo",
          width: 150,
          type: "string",
        },
      ];
      */
      });

    // [[key, value], [key, value]]
    const rowsFormat = [];

    statesProducts.products.forEach((product) => {
      const objData = {};
      Object.entries(product).forEach(([key, value]) => {
        if (listWrite.includes(key)) {
          objData[key] = value;
        }
      });
      rowsFormat.push(objData);
    });

    /* const rowsFormat = statesProducts.products
    .reduce((acum, product) => {
      const objData = {};
      Object.entries(product).forEach(([key, value]) => {
        if (listWrite.includes(key)) {
          objData[key] = value;
        }
      });
      acum.push(objData);
    }, []); */


    setDataGrid({
      rows: rowsFormat,
      columns: columnsFormat,
    });

    console.log(columnsFormat);
  }, [statesProducts.products]);

/*   const rowProduct = [
    {
      id: 1,
      title: "COCTELERÍA Y BEBIDAS",
      price: 1000,
      description: "dasasaddasadsads ad sasdasd",
    },
  ];

   */

  return (
    <>
      <h1>TODAS LOS PRODUCTOS</h1>

      <Container maxWidth={400} style={{ height: 400 }}>
        <DataGrid
          rows={dataGrid.rows}
          columns={dataGrid.columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Container>
    </>
  );
};

Product.propTypes = {};

export default Product;
