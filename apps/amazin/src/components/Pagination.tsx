import { memo } from 'react';
import { Link } from 'react-router-dom';

type PropType = {
  getUrl: FnType;
  page: string | undefined;
  pages: string | undefined;
  className?: string | undefined;
  help?: boolean | undefined;
  LinkTo: Children;
};
function Pagination({
  getUrl,
  page,
  pages,
  className = '',
  help = false,
  LinkTo = (props: Props) => <Link {...props} />
}: PropType) {
  const getClass = (x: number) => `${x + 1 === Number(page) ? 'active' : ''} ${className}`;

  return (
    <>
      <div className="row center pagination">
        {[...Array(pages || 0).keys()].map((x) => (
          <LinkTo key={x} to={getUrl({ page: x + 1 })} className={getClass(x)} children={x + 1} />
        ))}
      </div>

      {!!help && (
        <div>
          <h2>Do you need help?</h2>
          <p className="p-1 mb-1">
            Visit the <LinkTo to="/customer" children={<b>help section</b>} />
            {' or '}
            <LinkTo to="/contact/subject/Help" children={<b>contact us</b>} />
          </p>
        </div>
      )}
    </>
  );
}

export default memo(Pagination);