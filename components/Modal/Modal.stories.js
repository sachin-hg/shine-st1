import React from 'react';
import Modal from './index';
import styles from './modal.module.css';

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    isOpen: { control: 'boolean' },
    onClose: { action: 'onClose' },
    children: { control: 'text' },
  },
};

const Template = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  children: 'This is the modal content.',
};

export const Closed = Template.bind({});
Closed.args = {
  isOpen: false,
  children: 'This is the modal content.',
};

export const WithLongContent = Template.bind({});
WithLongContent.args = {
  isOpen: true,
  children: (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.
        Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed,
        dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper
        congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim
        est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis
        arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque
        congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum
        augue. Praesent egestas leo in pede. Praesent blandit odio eu enim.
      </p>
      <p>
        Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis
        in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh.
        Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non
        diam. Nunc sodales libero et nulla. Ut a nisl id ante tempus hendrerit.
        Proin sodales porttitor eros. Sed non ante. Mauris quam.
      </p>
    </div>
  ),
};