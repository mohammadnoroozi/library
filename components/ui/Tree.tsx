import React, { useState } from 'react';
import { PostListModel } from "@/models/PostListModel";
import { FilterCircle, ArrowUp, ArrowDown, CaretDown, CaretLeft, CircleFill } from "react-bootstrap-icons";
import Button from '@/components/forms/fields/Button';
import PagedList from "./PagedList";
import PostMenu from "./PostMenu";

interface Props {
    data?: PostListModel[],
    websiteId?: string,
    isExpanded: boolean
    setPostOrder: (postId: string, up: boolean) => void
    clearPostOrders: (postId: string) => void
}



interface TreeChildCounterProps {
    childPosts?: PostListModel[],
}

const TreeChildCounter = ({ childPosts }: TreeChildCounterProps) => {
    if (!childPosts || !childPosts.length) return <></>
    return <span className={`publish-status text-muted`}>[{childPosts.length}]</span>
}

interface TreeExpanderProps {
    childPosts?: PostListModel[],
    isChildExpanded: boolean,
    setIsChildExpanded: (value: boolean) => void
}

const TreeExpander = ({ childPosts, isChildExpanded, setIsChildExpanded }: TreeExpanderProps) => {
    if (!childPosts || !childPosts.length) return <></>
    return <Button variant='transparent' className='me-2 btn-sm' onClick={() => setIsChildExpanded(!isChildExpanded)}>
        {isChildExpanded ? <CaretDown /> : <CaretLeft />}
    </Button>
}

interface TreeItemProps {
    key: string,
    post: PostListModel,
    websiteId: string,
    getExpandStatus: (postId: string) => any
    setExpandStatus: (postId: string, value: boolean) => void
    setPostOrder: (postId: string, up: boolean) => void
    clearPostOrders: (postId: string) => void
}

const TreeItem = ({ post, websiteId, getExpandStatus, setExpandStatus, setPostOrder, clearPostOrders }: TreeItemProps) => {
    return <div className={post.parentId ? "ms-4 mb-2" : ""} key={post.id}>
        <div
            className="hover-shadow bg-hover-gray border border-secondary py-2 px-3 rounded mb-2">
            <TreeExpander childPosts={post.children} isChildExpanded={getExpandStatus(post.id)}
                setIsChildExpanded={value => setExpandStatus(post.id, value)} />
            <div className="row align-items-center">
                <div className="col-12 col-lg">
                    <CircleFill size={10} className={`me-2 text-${post.isDefault ? 'primary' : 'gray'}`} />
                    {post.menuTitle}
                    <TreeChildCounter childPosts={post.children} />
                    <br />
                    <small className={`en`}>[{post.slug}]</small>
                    <span className={`publish-status ${post.publishStatus}`}>[{post.publishStatus}]</span>
                </div>
                <div className="col-12 col-lg-auto">
                    <Button variant='secondary' onClick={() => setPostOrder(post.id, true)} className="ms-1 avatar-30 rounded-circle p-0">
                        <ArrowUp />
                    </Button>
                    <Button variant='secondary' onClick={() => setPostOrder(post.id, false)} className="m-1 avatar-30 rounded-circle p-0">
                        <ArrowDown />
                    </Button>
                    <Button variant='warning' onClick={() => clearPostOrders(post.id)} className="ms-1 avatar-30 rounded-circle p-0">
                        <FilterCircle />
                    </Button>
                    <PostMenu postId={post?.id} websiteId={websiteId} />
                </div>
            </div>
        </div>
        <Tree data={post.children} websiteId={websiteId} isExpanded={getExpandStatus(post.id)} setPostOrder={setPostOrder} clearPostOrders={clearPostOrders} />
    </div>
}

const Tree = ({ data, websiteId, isExpanded, setPostOrder, clearPostOrders }: Props) => {

    const [childrenStatus, setChildrenStatus] = useState<any>({});

    const getExpandStatus = (postId: string) => {
        return childrenStatus[postId] === undefined ? false : childrenStatus[postId];
    }
    const setExpandStatus = (postId: string, value: boolean) => {
        setChildrenStatus({ ...childrenStatus, [postId]: value });
    }

    return !isExpanded || data == null || !data.length
        ? <></>
        : <PagedList
            data={data}
            pageSize={50}
            renderRow={post => <TreeItem key={post.id} post={post}
                websiteId={websiteId ?? ""}
                getExpandStatus={getExpandStatus}
                setExpandStatus={setExpandStatus}
                setPostOrder={setPostOrder}
                clearPostOrders={clearPostOrders} />
            }
        />
};

export default Tree;
