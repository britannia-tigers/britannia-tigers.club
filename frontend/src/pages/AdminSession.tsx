import { useEffect, useMemo, useState } from "react";
import { PaymentResponse, getSessionPaymentList } from "../api/payments"
import { useParams } from "react-router-dom";
import { useSessionPaymentList } from "../hooks/admin";
import { useAuthToken } from "../hooks/auth";
import { useSession } from "../hooks/sessions";
import { AdminContainer } from "../components/AdminContainer";
import { Avatar, Box, Paragraph, Text, Tip } from "grommet";
import { MainTitle, SmallParagraph, SmallSubTitle, SubTitle } from "../components/Titles";
import { TBody, TCell, THead, TRow, TTable } from "../components/Table";
import { Copy, Edit } from "grommet-icons";
import { formatDisplayShortDate, strTrimmer } from "../helpers/displayHelpers";
import { Tag } from "../components/Tag";
import { useUserList } from "../hooks/user";
import Tags from "../configs/tags";


export function AdminSession() {
// 5a0jVdjMDrUn3ywYeGYSUh
  const { sessionId } = useParams()
  const session = useSession(sessionId);
  const paymentList = useSessionPaymentList(sessionId)
  const users = useUserList()
  
  const unPaidUsers = useMemo(() => {
    if(!session?.participants) return []
    const paid = session?.paidParticipants || []

    return session?.participants
      .filter(u => !paid.includes(u))
      .map(p => {
        return users?.find(u => u.user_id === p)
      })
      .filter(p => p)

  }, [session, users])

  const paidUsers = useMemo(() => {
    if(!session?.paidParticipants) return []

    return session?.paidParticipants.map(p => {
      return users?.find(u => u.user_id === p)
    }).filter(p => p)
  }, [session, users])

  return session && (
    <AdminContainer heading={<>Session</>}>
      <Box pad={{bottom: 'large'}}>
        <MainTitle marginBottom="8px">{formatDisplayShortDate(session.date)}</MainTitle>
        <SmallParagraph color="#999999">{session.name}</SmallParagraph>
        <Box>
          <Paragraph size="small">Unpaid:</Paragraph>
          <Box direction="row" gap="small">{
            unPaidUsers.map(p => 
              <Avatar src={p?.picture} background='grey'>{p?.picture === undefined ? p?.name[0] : null}</Avatar>
            )
          }</Box>
        </Box>
        <Box>
          <Paragraph size="small">Paid:</Paragraph>
          <Box direction="row" gap="small">{
            paidUsers.map(p => 
              <Avatar src={p?.picture} background='grey'>{p?.picture === undefined ? p?.name[0] : null}</Avatar>
            )
          }</Box>
        </Box>
      </Box>
      <Box pad={{bottom: 'large'}}>
        <TTable>
          <THead>
            <TCell />
            <TCell>Payment ID</TCell>
            <TCell>Name</TCell>
            <TCell>Email</TCell>
            <TCell>Phone</TCell>
            <TCell>Amount</TCell>
            <TCell>Status</TCell>
            <TCell>User ID</TCell>
          </THead>
          <TBody>
          {paymentList && paymentList.map(l => (
            <TRow>
              <TCell>
                <a target='stripe' href={`https://dashboard.stripe.com/${l.livemode ? '' : 'test/'}payments/${l.payment_intent}`}><Edit size="small" /></a>
              </TCell>
              <TCell>
                <Tip
                  dropProps={{ align: { left: 'right' } }}
                  content={
                    <Box background='black' pad="xsmall" gap="xsmall" width={{ max: 'xsmall' }}>
                      <Text size="small">
                        Click to copy
                      </Text>
                    </Box>
                  }
                  plain
                >
                 {l.payment_intent && (
                  <a onClick={() => navigator.clipboard.writeText(l.payment_intent)}>
                      {strTrimmer(l.payment_intent, 10)} <Copy size="small" />
                  </a>
                 )}
                </Tip>
              </TCell>
              <TCell>{l.user?.name}</TCell>
              <TCell>{l.user?.email}</TCell>
              <TCell>{l.user?.phone_number}</TCell>
              <TCell>&pound;{(l.amount_total/100).toFixed(2)}</TCell>
              <TCell><Box gap='xsmall' direction="row" justify="start">
                <Tag value={l.payment_status}/><Tag value={l.status}/>
              </Box></TCell>
              <TCell>
                <Tip
                  dropProps={{ align: { left: 'right' } }}
                  content={
                    <Box background='black' pad="xsmall" gap="xsmall" width={{ max: 'xsmall' }}>
                      <Text size="small">
                        Click to copy
                      </Text>
                    </Box>
                  }
                  plain
                >
                  {l.metadata?.userId && (
                    <a onClick={() => navigator.clipboard.writeText(l.metadata.userId)}>
                      {l.metadata?.userId && strTrimmer(l.metadata.userId)} <Copy size="small" />
                    </a>
                  )}
                </Tip>
              </TCell>
            </TRow>
          ))}
          </TBody>
        </TTable>
      </Box>
    </AdminContainer>
  )
}