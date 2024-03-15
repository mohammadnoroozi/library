import React from 'react';
import Link from "next/link";
import { LayerForward, Gear, Pencil, Plus, Eye } from "react-bootstrap-icons";

interface Props {
  postId?: string
  websiteId?: string
}



const PostMenu = ({ postId, websiteId }: Props) => {

  return postId ? <>
    <a target='_blank' href={`/redirect/${postId}`}
      className='btn btn-outline-green m-1 avatar-30 rounded-circle p-0'>
      <Eye size={24} />
    </a>
    <Link href={`/contents/website/${websiteId}/post/${postId}/add`}
      className="btn btn-outline-green m-1 avatar-30 rounded-circle p-0">
      <Plus size={24} />
    </Link>
    <Link href={`/contents/website/${websiteId}/post/${postId}/edit`}
      className="btn btn-outline-orange m-1 avatar-30 rounded-circle p-0">
      <Gear />
    </Link>
    <Link href={`/contents/website/${websiteId}/post/${postId}/plugins`}
      className="btn btn-outline-primary m-1 avatar-30 rounded-circle p-0">
      <Pencil />
    </Link>
    <Link href={`/contents/website/${websiteId}/post/${postId}/suggest`}
      className="btn btn-outline-info m-1 avatar-30 rounded-circle p-0">
      <LayerForward />
    </Link>
  </> : <></>
};

export default PostMenu;
