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
  Button,
} from "@react-email/components";
import bcryptjs from "bcryptjs";

interface ForgotPasswordEmailProps {
  email: string;
  userID: string;
  username: string;
}

export default async function ForgotPasswordEmail({
  email,
  userID,
  username,
}: ForgotPasswordEmailProps) {
  dbConnect();
  try {
    const hashedToken = await bcryptjs.hash(userID.toString(), 8);
    await UserModel.findByIdAndUpdate(userID, {
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: Date.now() + 3600000,
    });
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Reset Your Password</title>
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
        <Preview>Reset your password</Preview>
        <Section>
          <Row>
            <Heading as="h2">Hello {username},</Heading>
          </Row>
          <Row>
            <Text>
              Thanks from Feedback. Please use the following Link to reset your
              password :{" "}
              <a
                href={`${process.env.DOMAIN_NAME}/reset-password
              ?token=${hashedToken}`}
              >
                click here
              </a>
              <br />
              or Copy & paste the link below in your browser. <br />
              {` ${process.env.DOMAIN_NAME}/reset-password?token=${hashedToken}`}
            </Text>
          </Row>
          <Row>
            <Text className="font-bold"></Text>
          </Row>
          <Row>
            <Text>If you did not request this , please ignore this email.</Text>
          </Row>
          {/* <Row>
          <Button
            href={`http://localhost:3000/verify/${username}`}
            style={{ color: '#61dafb' }}
          >
            Verify here
          </Button>
        </Row> */}
        </Section>
      </Html>
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: `Error while sending reset password email.`,
      },
      {
        status: 401,
      }
    );
  }
}
