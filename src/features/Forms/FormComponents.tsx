import { ComponentProps } from 'react'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import { FaChevronDown } from 'react-icons/fa'

export function FormAccordion({
  header,
  children,
  ...props
}: FormAccordionProps) {
  return (
    <Accordion {...props} className={'!bg-transparent'}>
      <AccordionSummary
        className={'!bg-transparent'}
        expandIcon={<FaChevronDown />}
      >
        <div className={'text-lg opacity-80'}>{header}</div>
      </AccordionSummary>

      <AccordionDetails className={'!bg-transparent'}>
        <div className={'grid gap-3'}>{children}</div>
      </AccordionDetails>
    </Accordion>
  )
}

type FormAccordionProps = ComponentProps<typeof Accordion> & {
  header: string
}
