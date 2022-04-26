package com.ssafy.wiselaundry.domain.board.service;

import com.ssafy.wiselaundry.domain.board.db.entity.Board;
import com.ssafy.wiselaundry.domain.board.request.BoardCreateReq;
import com.ssafy.wiselaundry.domain.board.request.BoardUpdateReq;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

public interface BoardService {
    List<Board> boardSearchAll();
    Board boardSearchById(int boardId);
    void boardCreate(BoardCreateReq body, MultipartHttpServletRequest request);
    void boardUpdate(BoardUpdateReq body, MultipartHttpServletRequest request);
    void boardDelete(int boardId);
}
