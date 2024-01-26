import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import {GITHUB_LINK} from "@/constants";
const Footer: React.FC = () => {
  const defaultMessage = 'rainsun出品';
  const currentYear = new Date().getFullYear();
  // @ts-ignore
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'rainsun',
          title: 'rainsun',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> YuqingXiong</>,
          href: GITHUB_LINK,
          blankTarget: true,
        },
        {
          key: 'csdn',
          title: 'CSDN',
          href: 'https://blog.csdn.net/qq_45364953',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
