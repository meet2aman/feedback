import dbConnect from "@/db/dbConfig";
import UserModel from "@/models/User";
import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";
import bcryptjs from "bcryptjs";

interface ContactEmailProps {
  email: string;
  content: string;
  name: string;
}

export default async function ContactEmail({
  email,
  content,
  name,
}: ContactEmailProps) {
  dbConnect();
  try {
    // const hashedToken = await bcryptjs.hash(userID.toString(), 8);
    // await UserModel.findByIdAndUpdate(userID, {
    //   forgotPasswordToken: hashedToken,
    //   forgotPasswordTokenExpiry: Date.now() + 3600000,
    // });
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Message from {name} through feedback</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
              format: "woff2",
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Message Form {name}</Preview>
        <Section>
          <Row>
            <Heading as="h2">Hello i,m {name},</Heading>
            <Heading as="h2">From {email},</Heading>
          </Row>
          <Row>
            <Text>
              <p>Thanks {name} using feedback and for connecting... with us.</p>
              <br />
              Here is Message From {name} using this email {email}.
              <br />
              {content}
            </Text>
          </Row>
          <Row>
            <Text className="font-bold"></Text>
          </Row>
          <Row>
            <Text>If you did not request this , please ignore this email.</Text>
          </Row>
        </Section>
      </Html>
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: `Error while sending contact email.`,
      },
      {
        status: 401,
      }
    );
  }
}
