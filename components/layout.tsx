import Nav from './nav';

const Layout = ({ children, categories, seo }: any) => (
  <>
    <Nav categories={categories} />
    {children}
  </>
);

export default Layout;
