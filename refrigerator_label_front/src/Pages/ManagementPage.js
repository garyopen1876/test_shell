import * as React from "react";
import Bar from "../Components/AppBar";
import axios from "../Axios.config.js";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Typography,
  Chip,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import DeleteBtn from "../Components/DeleteBtn";
import { useNavigate } from "react-router-dom";
import MailBtn from "../Components/MailBtn";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

const theme = createTheme({
  palette: {
    Button: {
      main: "#363F4E",
    },
  },
});

// 我為Menu功能，進行中文化，但我鎖住了，不用理
const localizedTextsMap = {
  columnMenuUnsort: "原始排列",
  columnMenuSortAsc: "升序排列",
  columnMenuSortDesc: "降序排列",
  columnMenuFilter: "篩選",
  columnMenuHideColumn: "隱藏此列",
  columnMenuShowColumns: "顯示此列",
  footerRowSelected: (count) => `已選擇 ${count} 項 `,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManagementPage() {
  let navigate = useNavigate();

  // label_data
  const [rowData, setRowData] = React.useState([]);
  // select_data_id
  const [select_data_id, setSelectDataId] = React.useState([]);
  //snackbar
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  //Alert的文字
  const [AlertText, setAlertText] = React.useState("");
  const [btnLoading, setBtnLoading] = React.useState(false);
  //關掉Alert
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const { vertical, horizontal, open } = state;
  //儲存功能
  const handleUpdate = (id) => async () => {
    setBtnLoading(true);
    await axios
      .put(
        "api/label",
        {
          id: id,
          note: note,
        },
        { headers: { token: localStorage.getItem("login_token") } }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setBtnLoading(false);
        //overtime
        if (error.response.status === 402 || 403) {
          localStorage.removeItem("login_token");
          navigate("/");
        }
      });
    setState({
      open: true,
      ...{
        vertical: "top",
        horizontal: "center", //position of popout
      },
    });
    setAlertText("儲存成功");
    setBtnLoading(false);
  };
  //備註
  const [note, setNote] = React.useState("");
  //備註寫入
  const onChangeNote = (e) => {
    setNote(e.target.value);
  };

  const loadingData = React.useCallback(() => {
    const loadData = async () => {
      await axios
        .get("api/find_label_all", {
          headers: { token: localStorage.getItem("login_token") },
        })
        .then((response) => {
          const label_data = response["data"]["message"];
          setRowData(label_data);
        })
        .catch((error) => {
          console.log(error.response.data["message"]);
          //overtime
          if (error.response.status === 402 || 403) {
            localStorage.removeItem("login_token");
            navigate("/");
          }
        });
    };
    loadData();
  }, [navigate]);

  React.useEffect(() => {
      loadingData();
  }, [loadingData]);

  const getSelectData = (field) => {
    const select_data = [];
    rowData.forEach(function (each_label) {
      select_data_id.forEach(function (select_label_id) {
        if (each_label["id"] === select_label_id) {
          select_data.push(each_label[field]);
        }
      });
    });
    return select_data;
  };
  //刪除功能
  const handleDelete = async () => {
    const delete_data = getSelectData("label_id");
    if (delete_data.length !== 0) {
      await axios
        .delete("api/label", {
          headers: { token: localStorage.getItem("login_token") },
          data: { label_id: delete_data },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data["message"]);
          setBtnLoading(false);
          //overtime
          if (error.response.status === 402 || 403) {
            localStorage.removeItem("login_token");
            navigate("/");
          }
        });

      loadingData();
      setAlertText("刪除成功");
      setState({
        isLoading: true,
        open: true,
        ...{
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

  //讀取要寄信的人
  const handleMailPeople = () => {
    const get_mail_people = getSelectData("name");
    const get_mail_label_id = getSelectData("label_id");
    const get_mail_data = getSelectData("mail");
    const people = [];

    for (let count = 0; count < get_mail_people.length; count++) {
      people.push({
        key: count,
        label: get_mail_people[count] + "-" + get_mail_label_id[count],
        mail: get_mail_data[count],
        label_id: get_mail_label_id[count],
      });
    }
    return people;
  };
  //寄信功能
  const handleSendMail = async (mail_users, mail_content) => {
    if (mail_users.length !== 0) {
      await axios
        .post(
          "api/manual_send_mail",
          {
            users: mail_users,
            text: mail_content,
          },
          {
            headers: { token: localStorage.getItem("login_token") },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data["message"]);
          setBtnLoading(false);
          //overtime
          if (error.response.status === 402 || 403) {
            localStorage.removeItem("login_token");
            navigate("/");
          }
        });
      setAlertText("寄信成功");
      setState({
        open: true,
        ...{
          vertical: "top",
          horizontal: "center",
        },
      });
      setSelectDataId([]);
    }
  };

  // data grid columns definition
  const columns = [
    {
      field: "name",
      headerName: "物品所屬者",
      minWidth: 120,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "label_id",
      headerName: "ID",
      minWidth: 110,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "date",
      headerName: "放入日期",
      type: "date",
      minWidth: 220,
      flex: 2,
      disableColumnMenu: true,
      renderCell: (params) => {
        const string = params.value.split("- ");
        let chip_color = "#6cba6f";
        if (params.value.split("- ").pop().split(" day ago")[0] >= 7) {
          chip_color = "#ee9852";
        }
        return (
          <div>
            {string[0]}
            <Chip
              size="small"
              label={string[1]}
              color="primary"
              sx={{ backgroundColor: chip_color, borderRadius: "8px", ml: 1 }}
            />
          </div>
        );
      },
    },
    {
      field: "note",
      headerName: "備註",
      minWidth: 200,
      flex: 2,
      disableColumnMenu: true,
      sortable: false,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      minWidth: 100,
      flex: 1,
      cellClassName: "actions",
      align: "left",
      getActions: (params) => {
        return [
          <ThemeProvider theme={theme}>
            <LoadingButton
              onClick={handleUpdate(params.id)}
              loading={btnLoading}
              color="Button"
              variant="contained"
              disableElevation
            >
              <Typography color="white" variant="h7" sx={{ fontWeight: "500" }}>
                儲存
              </Typography>
            </LoadingButton>
          </ThemeProvider>,
        ];
      },
    },
  ];

  return (
    <div className="Home">
      <Bar />
      <Box
        className="DataGrid"
        style={{
          width: "100%",
        }}
      >
        <ThemeProvider theme={theme}>
          <div className="Header">
            <div className="Search">
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 420,
                  height: 32,
                  border: 1,
                }}
                elevation={0}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="搜尋物品"
                  inputProps={{ "aria-label": "search google maps" }}
                  disableElevation
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </div>
            <div className="ButtonDeleteandMail">
              <div className="DeleteBtn">
                <DeleteBtn handleDelete={handleDelete} />
              </div>
              <div className="MailBtn">
                <MailBtn
                  endIcon={<SendIcon />}
                  handleSendMail={handleSendMail}
                  handleMailPeople={handleMailPeople}
                />
              </div>
            </div>
          </div>
        </ThemeProvider>
        <DataGrid
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
              {
                outline: "none",
              },
          }}
          rows={rowData}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          localeText={localizedTextsMap}
          experimentalFeatures={{ newEditingApi: true }}
          onSelectionModelChange={(details) => {
            setSelectDataId(details);
          }}
          selectionModel={select_data_id}
        />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {AlertText}
        </Alert>
      </Snackbar>
    </div>
  );
}
