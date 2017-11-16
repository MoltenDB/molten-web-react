import * as MDBWeb from '../typings/mdb-web';
import * as render from './lib/render';

/**
 * Molten-web-react view component
 */
export const MDBView = (props: render.MDBViewProps): React.Component | Array<React.Component> => {
  const {mdb, dispatch} = props;
  const logger = mdb.logger;
  logger('MDBView', 'debug', props);

  // Set up dataHandler resolvers if any
  let resolvers;
  if (props.view.data) {
    Object.keys(props.view.data).forEach((key) => {
      const data = props.view.data[key];

      if (typeof data.type !== 'undefined') {
        if (props.mdb.dataHandlers[data.type]
            && props.mdb.dataHandlers[data.type].createResolver) {
          if (typeof resolvers === 'undefined') {
            resolvers = {};
          }

          resolvers[key] = props.mdb.dataHandlers[data.type].createResolver(props, data,
            props.data && props.data.path ? props.data.path.concat(['data', key]) : ['data', key]);
        }
      }
    });
  }

  if (props.view.template) {
    // Ensure we have the template view
    if (props.views[props.view.template]) {
      const templateView = props.views[props.view.template];
      // Render the view inside of the template
      const rendered = render.render({
        mdb,
        dispatch,
        data: {
          path: props.data.path ? props.data.path.concat(['views', props.views.template]) : [ 'views', props.views.template],
          views: {
            ...props.view.views,
            main: props.view.main
          },
          view: templateView,
          resolvers,
          previous: {
            view: props.view,
            previous: props.data
          }
        },
        component: templateView.main
      });

      if (resolvers) {
        Object.keys(resolvers).forEach((key) => {
          resolvers[key].finish();
        });
      }

      return rendered;
    } else {
      //@TODO Get the template view
      return null;
    }
  }

  {
    // Start iteration through view
    const rendered = render.renderChildren({
      mdb,
      dispatch,
      data: {
        view: props.view,
        path: (props.data && props.data.path) || [],
        previous: props.data,
        resolvers
      },
      children: props.view.main
    });

    if (resolvers) {
      Object.keys(resolvers).forEach((key) => {
        resolvers[key].finish();
      });
    }

    return rendered;
    /*return render.render({
      mdb: props.mdb,
      data: {
        view: props.view
      },
      component: props.view.main
    });*/
  }
};
export default MDBView;
