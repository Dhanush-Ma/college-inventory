import { useEffect, useContext, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode";
import formatDate from "../utilities/formatDate";
import { useNavigate } from "react-router-dom";
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
    alignItems: "center",
    justifyContent: "center",
  },
});

const QRPdf = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  if (!state) {
    console.log("here");
    return navigate("/departments");
  }
  const { roomProducts, labName } = state;


  function chunkArray(array, size) {
    let result = [];
    for (let i = 0; i < array.length; i += size) {
      let chunk = array.slice(i, i + size);
      result.push(chunk);
    }
    return result;
  }

  const generateQR = async (data) => {
    const {
      productID,
      category,
      productName,
      modelNumber,
      datePurchased,
      supplierName,
      supplierContact,
      costOfItem,
      discountPercent,
      RAM,
      hardDrive,
      os,
      processor,
      roomID,
      warrantyDate,
      warrantyNote,
    } = data;

    try {
      return await QRCode.toDataURL(`
      Product ID: ${productID},
      Product Name: ${productName},
      Date of Purchase: ${datePurchased},
      Category: ${category},
      Model Number: ${modelNumber},
      Supplier Name: ${supplierName},
      Supplier Contact: ${supplierContact},
      Cost of Item: ${costOfItem},
      Discount Percent: ${discountPercent},
      RAM: ${RAM},
      Hard Drive: ${hardDrive},
      OS: ${os},
      Processor: ${processor},
      Room ID: ${roomID},
      Warranty Date: ${formatDate(warrantyDate)},
      Warranty Note: ${warrantyNote},`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {state && (
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <Document style={[{ width: "100%", height: "100%" }]}>
            {chunkArray(roomProducts, 6).map((element, index) => {
              return (
                <Page orientation="portrait" style={styles.page}>
                  <View style={styles.section}>
                    {index === 0 && (
                      <Text
                        style={{
                          marginBottom: 20,
                          textAlign: "center",
                        }}
                      >
                        {labName}
                      </Text>
                    )}
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 30,
                      }}
                    >
                      {element.map((product) => (
                        <View
                          style={{
                            width: "200px",
                            height: "200px",
                            border: 2,
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                            paddingVertical: 10,
                            borderRadius: 5,
                          }}
                        >
                          <Image
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                            src={generateQR(product)}
                          />
                          <Text>{product.productID}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </Page>
              );
            })}
          </Document>
        </PDFViewer>
      )}
    </>
  );
};

export default QRPdf;
