import { ScrollArea } from '@mantine/core';
import React from 'react';

export interface ScrollSnapshot {
  scrollHeight: number | undefined;
  scrollTop: number | undefined;
  clientHeight: number | undefined;
  wasScrollToBottom: boolean;
  wasScrollToLoadingThreshold: boolean;
}

export interface Actions {
  scrollTop: () => number | undefined;
  clientHeight: () => number | undefined;
  scrollHeight: () => number | undefined;
  scrolledToBottom: () => boolean;
  scrolledToLoadingThreshold: () => boolean;
  scrollToBottom: (behavior?: 'auto' | 'smooth') => void;
  scrollToMatch: () => void;
}

export interface ChatScrollApi extends Actions {
  snapshot: () => ScrollSnapshot;
}

export interface ChatScrollAreaProps {
  children?: React.ReactNode;
  getChatScrollApi?: (api: ChatScrollApi) => void;
  onReachingLoadingThreshold?: () => void;
  loadingThreshold?: number;
}

export class ChatScrollArea extends React.Component<ChatScrollAreaProps> {
  constructor(props: ChatScrollAreaProps) {
    super(props);
    this.scrollAreaRef = this.scrollAreaRef.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  private scrollArea!: HTMLDivElement;
  private scrollSnapshot!: ScrollSnapshot;

  private actions: Actions = {
    scrollHeight: () => {
      if (this.scrollArea) return this.scrollArea.scrollHeight;
    },
    scrollTop: () => {
      if (this.scrollArea) return this.scrollArea.scrollTop;
    },
    clientHeight: () => {
      if (this.scrollArea) return this.scrollArea.clientHeight;
    },
    scrolledToBottom: () => {
      if (this.scrollArea)
        return (
          this.scrollArea.scrollHeight -
            this.scrollArea.clientHeight -
            this.scrollArea.scrollTop <
          6
        );
      return false;
    },
    scrolledToLoadingThreshold: () => {
      if (this.scrollArea)
        return this.scrollArea.scrollTop <= (this.props.loadingThreshold || 0);
      return false;
    },
    scrollToBottom: (behavior = 'auto') => {
      if (this.scrollArea) {
        this.scrollArea.scrollTo({ top: this.scrollArea.scrollHeight, behavior });
      }
    },
    scrollToMatch: () => {
      if (this.scrollArea)
        this.scrollArea.scrollTop =
          this.scrollArea.scrollHeight - (this.scrollSnapshot.scrollHeight || 0);
    },
  };

  private scrollAreaRef(scrollArea: HTMLDivElement) {
    this.scrollArea = scrollArea;

    if (this.props.getChatScrollApi) {
      this.props.getChatScrollApi({
        ...this.actions,
        snapshot: () => {
          return this.scrollSnapshot;
        },
      });
    }
  }

  getSnapshotBeforeUpdate() {
    this.scrollSnapshot = {
      scrollHeight: this.actions.scrollHeight(),
      clientHeight: this.actions.clientHeight(),
      scrollTop: this.actions.scrollTop(),
      wasScrollToBottom: this.actions.scrolledToBottom(),
      wasScrollToLoadingThreshold: this.actions.scrolledToLoadingThreshold(),
    };
    return this.scrollSnapshot;
  }

  componentDidUpdate(): void {}

  private onScroll() {
    if (
      this.actions.scrolledToLoadingThreshold() &&
      this.props.onReachingLoadingThreshold
    ) {
      this.props.onReachingLoadingThreshold();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <ScrollArea
        viewportRef={this.scrollAreaRef as React.ForwardedRef<HTMLDivElement>}
        onScrollPositionChange={this.onScroll}
        scrollbarSize={10}
        sx={(theme) => ({
          paddingInline: theme.spacing.md,
        })}
      >
        {children}
      </ScrollArea>
    );
  }
}
