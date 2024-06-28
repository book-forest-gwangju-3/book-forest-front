import React, { useState } from "react";
import { PiUserCircleLight } from "react-icons/pi";
import { formatDateYMDHM } from "../../utils/dateUtils";
import { LuDelete } from "react-icons/lu";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { useSelector } from "react-redux";

const ReportReviewItem = ({
  item,
  token,
  reportId,
  onCommentUpdate,
  onCommentDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(item.content);
  const userInfo = useSelector((state) => state.user.userInfo); // 로그인 유저 정보
  // 댓글 수정 시작
  const handleEdit = () => {
    setIsEditing(true);
  };
  // 댓글 수정 취소
  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(item.content);
  };
  // 댓글 수정본 저장
  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/book-reviews/${reportId}/comments/${item.id}`,
        { content: editedContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onCommentUpdate(response.data); // 부모한테 수정된 댓글 전달해서 렌더링된것처럼 보이게(Optimistic UI Update)
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating comment", error);
    }
  };

  // 댓글 삭제
  const handleDelete = async () => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(
          `http://localhost:8080/book-reviews/${reportId}/comments/${item.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        onCommentDelete(item.id); // 부모 컴포넌트에 삭제된 댓글 id 전달(Optimistic UI Update)
      } catch (error) {
        console.log("Error deleting comment", error);
      }
    }
  };

  return (
    <div className="pt-4">
      <div className="mb-1 flex">
        <PiUserCircleLight className="w-10 h-10" />
        <div className="ml-2 flex flex-col w-full">
          <b className="capitalize">{item.user.username}</b>
          <time className="text-gray-400 text-xs">
            {formatDateYMDHM(item.createdAt)}
          </time>
          {isEditing ? (
            <div>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full p-2 border rounded mt-2"
              />
              <div className="mt-2 ml-2">
                <button
                  onClick={handleSave}
                  className="mr-2 transition-all duration-300 ease-in-out hover:underline hover:text-gray-400"
                >
                  수정
                </button>
                <button
                  onClick={handleCancel}
                  className="transition-all duration-300 ease-in-out hover:underline hover:text-gray-400"
                >
                  취소
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="whitespace-pre-wrap">{item.content}</p>
              {userInfo?.username === item.user.username && (
                <div className="flex gap-1">
                  <button
                    onClick={handleEdit}
                    className="cursor-pointer hover:scale-110"
                  >
                    <BiEditAlt />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="cursor-pointer hover:scale-110"
                  >
                    <LuDelete />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportReviewItem;
