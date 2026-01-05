import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    padding: 16,
    alignItems: "flex-end",
  },
  containerNewUser: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    marginBottom: 60,
  },
  titleNewUser: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#01ad09",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  descricao: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  autor: {
    fontSize: 12,
    color: "#777",
  },
  data: {
    fontSize: 12,
    color: "#777",
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
  filtroContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  filtroButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  filtroText: {
    color: "#fff",
    fontWeight: "bold",
  },
  headerCenter: {
    display: "flex",
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    padding: 16
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 0,
    margin: 16
  },
  containerlogin: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  titleLogin: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  error: {
    color: "red",
    marginBottom: 12,
    textAlign: "center",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 16,
    width: "90%",
  },
  field: {
    marginBottom: 16,
  },
  label: {
    marginLeft: 6,
    marginBottom: 6,
    fontWeight: "600",
    color: "#333",
  },
  pickerWrapper: {
    borderWidth: 0,
    borderColor: "#ddd",
    borderRadius: 30,
    backgroundColor: "#fff",
  },
  picker: {
    height: 40,
    paddingHorizontal: 7,
    borderRadius: 5,
    backgroundColor: "#f2f2f2",
    borderColor: "#ccc",
  },
  itemMenu: {
    fontSize: 16,
    color: "#333",
    fontWeight: 500, 
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2f2",
    paddingBottom: 15,
  },
});