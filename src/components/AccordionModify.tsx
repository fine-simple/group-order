import styled from "@emotion/styled";
import {
  AccordionActions,
  AccordionDetails,
  Button,
  IconButton,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import arrowIcon from "@mui/icons-material/ArrowForwardIosSharp";
import EditIcon from "@mui/icons-material/Edit";
import type { FC } from "react";
import type { AccordionProps } from "@mui/material/Accordion";
import type { AccordionSummaryProps } from "@mui/material/AccordionSummary";
import type { MouseEventHandler } from "react";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters square {...props} />
))(() => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const ArrowForwardIosSharpIcon = styled(arrowIcon)({
  fontSize: "0.9rem",
});

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon />} {...props} />
))(() => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
}));

const Summary = styled("p")({
  margin: "auto 1rem auto auto",
});

const Title = styled("h3")({});

export interface IAccordionModifyProps extends AccordionProps {
  title: string;
  summary?: string;
  onEdit?: MouseEventHandler<HTMLButtonElement>;
}

const AccordionModify: FC<IAccordionModifyProps> = ({
  title,
  children,
  summary,
  onEdit = () => null,
  ...props
}) => {
  const handleEdit: typeof onEdit = e => {
    e.stopPropagation();
    onEdit(e);
  };

  return (
    <Accordion {...props}>
      <AccordionSummary>
        <Title>{title}</Title>
        <Summary>{summary}</Summary>
        <AccordionActions>
          <IconButton
            onClick={handleEdit}
            title={`edit ${title}`}
            color="primary"
          >
            <EditIcon />
          </IconButton>
        </AccordionActions>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionModify;
