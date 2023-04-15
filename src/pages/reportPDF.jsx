import { useEffect, useContext, useState } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import formatDate from "../utilities/formatDate";
import {
  singleProductHeadingsPDF,
  singleProductAcessorsPDF,
  batchProductHeadings,
  batchProductAcessors,
} from "../utilities/tableDetails";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    padding: 15,
  },
  section: {
    flexGrow: 1,
    borderStyle: "solid",
    borderWidth: 2,
    padding: 15,
  },
  title: {
    marginHorizontal: "auto",
    fontSize: 32,
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    width: "100%",
    flexDirection: "row",
  },
  tableHeading: {
    margin: "auto",
    width: "100%",
    flexDirection: "row",
    borderStyle: "solid",
    borderBottomWidth: 2,
  },
  tableCol: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    textAlign: "center",
  },
});

const reportPDF = () => {
  const [data, setData] = useState(null);
  const { state } = useLocation();
  const { deptID, deptName } = state;
  const userID = localStorage.getItem("userid");

  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/report-pdf?deptID=${deptID}&userID=${userID}`,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {data && (
        <div className="w-full h-full">
          <PDFViewer style={{ width: "100vw", height: "100vh" }}>
            <Document style={[{ width: "100%", height: "100vh" }]}>
              {data.deptRooms.length > 0 ? (
                data.deptRooms.map((room, idx) => {
                  const { labID, labName } = room;
                  const { products } = data.globalRoomProducts.filter(
                    (room) => room.labID === labID
                  )[0];
                  const { services } = data.globalRoomServices.filter(
                    (room) => room.labID === labID
                  )[0];

                  const singleProductsArr = products.filter(
                    (item) => item.type === "single"
                  );
                  const batchProductsArr = products.filter(
                    (item) => item.type === "batch"
                  );

                  return (
                    <>
                      <Page
                        key={idx}
                        orientation="landscape"
                        style={styles.page}
                      >
                        <View style={styles.section}>
                          {idx === 0 && (
                            <Text style={{ marginBottom: 20, fontSize: 30 }}>
                              {deptName}
                            </Text>
                          )}
                          <View>
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 20,
                                marginBottom: 20,
                              }}
                            >
                              <Text>{labID}</Text>
                              <Text>{labName}</Text>
                            </View>
                            <Text
                              style={{
                                borderBottom: 2,
                                paddingBottom: 5,
                                width: 180,
                              }}
                            >
                              Single Product Details
                            </Text>
                            <View
                              style={[styles.table, { marginVertical: 20 }]}
                            >
                              <View style={[styles.tableHeading]}>
                                {singleProductHeadingsPDF.map(
                                  (heading, idx) => (
                                    <View key={idx} style={styles.tableCol}>
                                      {heading.includes("(₹)") ? (
                                        <Text
                                          style={[
                                            styles.tableCell,
                                            { fontWeight: "bold" },
                                          ]}
                                        >
                                          {heading.split("(₹)")}(Rs.)
                                        </Text>
                                      ) : (
                                        <Text
                                          style={[
                                            styles.tableCell,
                                            { fontWeight: "bold" },
                                          ]}
                                        >
                                          {heading}
                                        </Text>
                                      )}
                                    </View>
                                  )
                                )}
                              </View>
                              {singleProductsArr.length > 0 ? (
                                singleProductsArr.map((product, idx) => {
                                  return (
                                    <>
                                      <View key={idx} style={styles.tableRow}>
                                        {singleProductAcessorsPDF.map(
                                          (accessor, idx) => (
                                            <View
                                              key={idx}
                                              style={styles.tableCol}
                                            >
                                              <Text
                                                key={idx}
                                                style={[styles.tableCell]}
                                              >
                                                {product[accessor]}
                                              </Text>
                                            </View>
                                          )
                                        )}
                                      </View>
                                    </>
                                  );
                                })
                              ) : (
                                <View style={styles.tableCol}>
                                  <Text
                                    style={[
                                      {
                                        paddingVertical: 10,
                                        paddingLeft: 5,
                                      },
                                    ]}
                                  >
                                    No data available
                                  </Text>
                                </View>
                              )}
                            </View>
                            <Text
                              style={{
                                borderBottom: 2,
                                paddingBottom: 5,
                                width: 180,
                              }}
                            >
                              Batch Products Details
                            </Text>
                            <View
                              style={[styles.table, { marginVertical: 20 }]}
                            >
                              <View style={[styles.tableHeading]}>
                                {batchProductHeadings.map((heading, idx) => (
                                  <View key={idx} style={styles.tableCol}>
                                    {heading.includes("(₹)") ? (
                                      <Text
                                        style={[
                                          styles.tableCell,
                                          { fontWeight: "bold" },
                                        ]}
                                      >
                                        {heading.split("(₹)")}(Rs.)
                                      </Text>
                                    ) : (
                                      <Text
                                        style={[
                                          styles.tableCell,
                                          { fontWeight: "bold" },
                                        ]}
                                      >
                                        {heading}
                                      </Text>
                                    )}
                                  </View>
                                ))}
                              </View>
                              {batchProductsArr.length > 0 ? (
                                batchProductsArr.map((product, idx) => {
                                  return (
                                    <>
                                      <View key={idx} style={styles.tableRow}>
                                        {batchProductAcessors.map(
                                          (accessor, idx) => (
                                            <View
                                              key={idx}
                                              style={styles.tableCol}
                                            >
                                              <Text
                                                key={idx}
                                                style={[
                                                  styles.tableCell,
                                                  { fontWeight: "bold" },
                                                ]}
                                              >
                                                {product[accessor]}
                                              </Text>
                                            </View>
                                          )
                                        )}
                                      </View>
                                    </>
                                  );
                                })
                              ) : (
                                <View style={styles.tableCol}>
                                  <Text
                                    style={[
                                      {
                                        paddingVertical: 10,
                                        paddingLeft: 5,
                                      },
                                    ]}
                                  >
                                    No data available
                                  </Text>
                                </View>
                              )}
                            </View>
                            <View style={{ marginTop: 30 }}>
                              <Text
                                style={{
                                  borderBottom: 2,
                                  paddingBottom: 5,
                                  width: 130,
                                }}
                              >
                                Services History
                              </Text>
                              {services.length > 0 ? (
                                <View
                                  style={{
                                    marginTop: 20,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                  }}
                                >
                                  {services.map((service, idx) => {
                                    return (
                                      <View
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                        }}
                                      >
                                        <View style={{}}>
                                          <Text>{`${idx + 1}.)`}</Text>
                                        </View>
                                        <View
                                          style={{
                                            marginRight: 20,
                                            marginLeft: 10,
                                          }}
                                        >
                                          <Text>Product ID</Text>
                                          <Text>Cost</Text>
                                          <Text>Serivice Date</Text>
                                          <Text>Description</Text>
                                        </View>
                                        <View>
                                          <Text>{service.productID}</Text>
                                          <Text>Rs. {service.cost}</Text>
                                          <Text>
                                            {formatDate(service.date)}
                                          </Text>
                                          <Text>{service.description}</Text>
                                        </View>
                                      </View>
                                    );
                                  })}
                                </View>
                              ) : (
                                <Text style={{ marginTop: 20 }}>N/A</Text>
                              )}
                            </View>
                          </View>
                        </View>
                      </Page>
                    </>
                  );
                })
              ) : (
                <Page orientation="landscape" style={styles.page}>
                  <View style={styles.section}>
                    <Text style={{ marginBottom: 20, fontSize: 30 }}>
                      {deptName}
                    </Text>
                  </View>
                </Page>
              )}
            </Document>
          </PDFViewer>
        </div>
      )}
    </>
  );
};

export default reportPDF;
