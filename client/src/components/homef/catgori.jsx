import {
    Button,
    Table,
    TableCell,
    TableRow,
    TableHead,
    TableBody,
    TableContainer,
    Paper,
    Box,
  } from "@mui/material";
  import { 
    MusicNote, 
    Movie, 
    Code, 
    SportsEsports, 
    AddCircleOutline 
  } from "@mui/icons-material"; 
  import { categeriesFrom } from "../../constant/data";
  import { Link,useSearchParams } from "react-router-dom";
  import { styled } from "@mui/system";
  
  // Styled Components
  const CreateButton = styled(Button)({
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    color: "#fff",
    marginTop:"20px",
    padding: "14px 28px",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: "50px",
    textTransform: "uppercase",
    boxShadow: "0px 5px 20px rgba(0, 114, 255, 0.5)",
    transition: "all 0.3s ease-in-out",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    "&:hover": {
      background: "linear-gradient(135deg, #0072ff, #00c6ff)",
      transform: "scale(1.05)",
      boxShadow: "0px 5px 25px rgba(0, 114, 255, 0.8)",
    },
  });
  
  const StyledTableContainer = styled(TableContainer)({
    marginTop: "20px",
    borderRadius: "15px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
    overflow: "hidden",
  });
  
  const StyledTableRow = styled(TableRow)({
    "&:nth-of-type(odd)": {
      backgroundColor: "#f9f9f9",
    },
    "&:hover": {
      backgroundColor: "#e3e3e3",
      transition: "0.3s ease-in-out",
    },
  });
  
  const StyledTableCell = styled(TableCell)({
    padding: "14px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#333",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "center",
  });
  
  const HeaderCell = styled(TableCell)({
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: "bold",
    textTransform: "uppercase",
  });
  
  const StyledLink = styled(Link)({
    textDecoration: "none",
  });
  
  const HeaderContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15px",
    padding: "0 20px",
  });
  const StyledTableHead = styled(TableHead)({
    backgroundColor: "#222",
  });
  
  
  // Function to map categories to icons
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "gaming":
        return <SportsEsports sx={{ color: "#ff4b2b" }} />;
      case "music":
        return <MusicNote sx={{ color: "#1db954" }} />;
      case "movies":
        return <Movie sx={{ color: "#ff8c00" }} />;
      case "coding":
        return <Code sx={{ color: "#0072ff" }} />;
      default:
        return null;
    }
  };
  
  const Categ = () => {

const [searchParams]=useSearchParams();

const category=searchParams.get("category")
console.log(category);

    return (
      <Box textAlign="center">
        {/* Create Blog Button */}
        <HeaderContainer>
          <StyledLink to={`/create?category=${category || ""}`}>
            <CreateButton variant="contained">
              <AddCircleOutline /> Create
            </CreateButton>
          </StyledLink>
        </HeaderContainer>
  
        {/* Category Table */}
        <StyledTableContainer component={Paper}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <HeaderCell align="center">
                  <Link to="/">
                  Categories
                  </Link>
                </HeaderCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {categeriesFrom.map((category) => (
                <StyledTableRow key={category.id}>
                  <StyledTableCell align="center">
<StyledLink to={`/?category=${category.type}`}>
                    {getCategoryIcon(category.type)}
                    {category.type}
                    </StyledLink>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Box>
    );
  };
  
  export default Categ;
  